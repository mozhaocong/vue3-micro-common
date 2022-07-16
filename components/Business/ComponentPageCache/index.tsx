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
	setup(props) {
		const detailsList = ref<ObjectMap[]>([])
		const route = useRoute()
		const { commit, state } = useStore()

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
		function init() {
			let routeData: ObjectMap = routeToRouterTagListData(route)
			if (detailsList.value.map((item) => item.routerData.path).includes(routeData.path)) {
				return
			}
			if (props.setRouteData) {
				routeData = props.setRouteData(routeData)
			}
			commit('erpLayout/AddDeleteRouterTagList', { type: 'add', data: deepClone(routeData) })
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
			setDetailsList(routeData)
		}

		const currentRoutePath = computed(() => {
			return routeToRouterTagListData(route).path
		})

		watch(
			() => props.watchActivatedId,
			() => {
				init()
			}
		)

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
