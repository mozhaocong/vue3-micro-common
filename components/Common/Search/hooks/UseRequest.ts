import { clone, equals } from 'ramda'
import { Ref, ref, onMounted } from 'vue'
import { DefaultConfig, PageType, usePagination } from './UsePagination'
import { deepClone, isTrue } from '@/utils'
type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
	[key in Key]: Value
}
/**
 * 仿 阿里 react  a-hooks useRequest 集成useRequest  自带分页
 */
interface Options<R, P extends any[]> {
	manual?: boolean // 加载 是否自动发送
	pagination?: boolean // 是否使用分页
	onSuccess?: (data: R, params: P) => void // 成功回调
	onError?: (e: string, params: P) => void // 失败回调
	defaultLoading?: boolean // 默认 loading 状态
	defaultParams?: P | any[]
	paginationKey?: {
		total: string
		current: string
		size: string
	}
	paramsPaginationKey?: ParamsPaginationKey
	getPaginationFilter?: (value: ObjectMap) => ObjectMap
	paginationDefaultConfig?: DefaultConfig
}
export type noop = (...args: any[]) => void
export interface FetchResult<R, P extends any[]> {
	loading: boolean
	data: R | undefined // 请求函数结果
	error: string | undefined
	params: P // 入参
	cancel: noop // 取消方式
	refresh: () => Promise<R> // 刷新
	// TODO 如果 options 存在 debounceInterval，或 throttleInterval，则 run 和 refresh 不会返回 Promise。类型需要修复。
	run: (...args: P) => Promise<R> // 请求,
}

export interface ParamsPaginationKey {
	current: string
	size: string
}
const defPaginationKey = {
	total: 'total',
	current: 'current_page',
	size: 'per_page',
}

const defParamsPaginationKey: ParamsPaginationKey = {
	current: 'page',
	size: 'size',
}

// 用于获取 Promise 函数的"解构类型"
type PromiseReturnType<T extends () => any> = ReturnType<T> extends Promise<infer R> ? R : ReturnType<T>

export function useRequest<T extends (...arg: any) => Promise<any>>(
	service: T,
	options: Options<PromiseReturnType<typeof service>, Parameters<typeof service>> = {
		defaultLoading: false,
		manual: false,
		pagination: false,
	}
) {
	const loading = ref(options?.defaultLoading || false)
	const data = ref({}) as Ref<PromiseReturnType<typeof service>>
	const error = ref<string | null>(null)
	const runSearchData = ref()
	type ServiceParam = Parameters<typeof service>
	const { getPagination, total, pageSize, renderPagination, current } = usePagination(
		search,
		options.paramsPaginationKey ?? defParamsPaginationKey
		// options.paginationDefaultConfig
	)
	const params = ref(options?.defaultParams ?? []) as Ref<Parameters<typeof service>>
	function run(...parm: ServiceParam) {
		loading.value = true
		runSearchData.value = deepClone(parm[0])
		return new Promise((resolve) => {
			service(...(parm as any))
				.then(
					(item) => {
						if (options.onSuccess) {
							options.onSuccess(item, parm)
						}
						data.value = clone(item)
						try {
							if (options.pagination) {
								const paginationKey = options.paginationKey ?? defPaginationKey
								const totalData = (data.value as any).data[paginationKey.total]
								const currentData = (data.value as any).data[paginationKey.current]
								const pageSizeData = (data.value as any).data[paginationKey.size]
								if (isTrue(totalData)) {
									total.value = totalData
								}
								if (isTrue(currentData)) {
									current.value = currentData
								}
								if (isTrue(pageSizeData)) {
									pageSize.value = pageSizeData
								}
							}
						} catch (error) {
							console.warn('分页参数异常')
						}
						resolve(item)
					},
					(err: string) => {
						if (options.onError) {
							options.onError(err, parm)
							error.value = err
						}
					}
				)
				.finally(() => {
					loading.value = false
					params.value = parm
				})
		})
	}
	function refresh() {
		run(...params.value)
	}
	if (options.manual) {
		onMounted(() => {
			run(...params.value)
		})
	}
	// 使用到分页的时候 使用
	function search(type?: PageType) {
		if (!equals(type, PageType.new)) {
			current.value = 1
		}
		const parm = clone(params.value)
		const data = {
			...parm[0],
			...(options.getPaginationFilter ? options.getPaginationFilter(getPagination()) : getPagination()),
		}
		parm[0] = data
		run(...parm)
	}
	/**
	 * 重置请求
	 */
	function clear() {
		;(params.value as any) = []
		refresh()
	}
	return {
		refresh,
		run,
		data,
		loading,
		params,
		error,
		clear,
		renderPagination,
		getPagination,
		total,
		pageSize,
		current,
		runSearchData,
	}
}
