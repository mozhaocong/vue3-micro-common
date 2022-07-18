import { computed, defineComponent, PropType, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { asyncApiRes, deepClone, routeToRouterTagListData } from '@/utils'
import { useStore } from 'vuex'

const Props = {
	apiRequest: { type: Function as PropType<() => Promise<any>>, required: true },
	setRequestData: { type: Function as PropType<(item: any) => ObjectMap> },
	// 通过监听watchActivatedId 触发初始化
	watchActivatedId: { type: Number as PropType<number>, required: true },
	setRouteData: { type: Function as PropType<(item: any) => ObjectMap> },
	defComponents: {
		type: null,
		default() {
			return ''
		},
	},
} as const
const pageKey = 'componentPageCache'
export default defineComponent({
	name: pageKey,
	props: Props,
	setup(props, { expose }) {
		const detailsList = ref<ObjectMap[]>([])
		const route = useRoute()
		const { commit, state } = useStore()

		function initData() {
			let routeData: ObjectMap = routeToRouterTagListData(route)
			if (props.setRouteData) {
				routeData = props.setRouteData(routeData)
			}
			if (detailsList.value.map((item) => item.routerData.path).includes(routeData.path)) {
				return
			}
			asyncApiRes(props.apiRequest(), { value: '' }, (item) => {
				if (props.setRequestData) {
					item = props.setRequestData(item)
				}
				detailsList.value.push({
					value: item,
					routerData: routeData,
					components: item.components ?? props.defComponents,
				})
			})
		}

		function initRouter() {
			let routeData: ObjectMap = routeToRouterTagListData(route)
			if (props.setRouteData) {
				routeData = props.setRouteData(routeData)
			}
			commit('erpLayout/AddDeleteRouterTagList', { type: 'add', data: deepClone(routeData) })
			setDetailsList(routeData)
		}

		const currentRoutePath = computed(() => {
			return routeToRouterTagListData(route).path
		})

		function deleteRouter() {
			const routeData: ObjectMap = routeToRouterTagListData(route)
			commit('erpLayout/AddDeleteRouterTagList', { type: 'delete', data: routeData })
			setDetailsList(routeData)
		}

		// 去除多余的节点
		function setDetailsList(routeData: any) {
			const routerTagIdList = state.erpLayout.routerTagList
				.filter((res: any) => {
					return res.name === routeData.name
				})
				.map((res: any) => {
					return res.path
				})
			detailsList.value = detailsList.value.filter((item) => routerTagIdList.includes(item?.routerData?.path))
		}
		watch(
			() => props.watchActivatedId,
			() => {
				initRouter()
				initData()
			}
		)

		expose({ deleteRouter })

		return () => {
			return (
				<div>
					{detailsList.value.map((item) => {
						return (
							<div style={currentRoutePath.value === item.routerData.path ? 'display: block' : 'display: none'}>
								{item.components && item.components(item.value)}
							</div>
						)
					})}
				</div>
			)
		}
	},
})
