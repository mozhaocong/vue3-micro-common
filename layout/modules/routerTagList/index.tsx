import { computed, defineComponent, watch } from 'vue'
import { isTrue, routeToRouterTagListData } from '@/utils'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Dropdown, Tag } from 'ant-design-vue'
import { last } from 'ramda'
import './index.less'
import { microEmptyRouterTag, microResetRouterTag, microTagRouterClick } from '@/microAppMethod'

export default defineComponent({
	name: 'RouterTagList',
	setup() {
		const route = useRoute()
		const router = useRouter()
		const { state, commit } = useStore()
		const routerTagList = computed<any[]>(() => {
			return state.erpLayout?.routerTagList || []
		})
		const isShowTagList = computed(() => !route?.meta?.isMicro)

		watch(
			() => route,
			(value) => {
				commit('erpLayout/SetRouterTagKey', (value?.fullPath as string) || '')
				const item: ObjectMap = routeToRouterTagListData(route)
				const routerFilter = route.matched.filter((res) => res.name === route.name) || []
				const routerData = routerFilter[0] || {}
				if (
					!isTrue(routerData.name) ||
					isTrue(routerData.children) ||
					item?.meta?.hideMenuItem ||
					item.name === 'index' ||
					item.title === 'vite'
				) {
					return false
				}
				commit('erpLayout/AddDeleteRouterTagList', { data: item, type: 'add' })
			},
			{ deep: true, immediate: true }
		)

		// if (!isTrue(routerTagList.value) && isShowTagList.value) {
		// 	const list = state?.erpLayout?.layoutRouterData || []
		// 	const data = list.filter((item: any) => item.pathName === route.meta.pathName)
		// 	const filterData = getArrayFilterData(data, (item) => {
		// 		if (!isTrue(item.name) || item.children || item?.meta?.hideMenuItem) {
		// 			return false
		// 		}
		// 		return route.name === item.name
		// 	})
		// 	if (isTrue(filterData)) {
		// 		filterData[0].path = route.fullPath
		// 		commit('erpLayout/AddDeleteRouterTagList', { data: filterData[0], type: 'add' })
		// 	}
		// }

		function tagClose(item: any, index: number) {
			commit('erpLayout/AddDeleteRouterTagList', { data: item, type: 'delete' })
			if (!routerTagList.value.length) {
				// router.push('/')
				microEmptyRouterTag()
				return
			}
			// if (index >= routerTagList.value.length) {
			// 	const path = last(routerTagList.value).path
			// 	router.push(path)
			// } else {
			// 	router.push(routerTagList.value[index].path)
			// }

			if (index >= routerTagList.value.length) {
				tagClick(last(routerTagList.value))
			} else {
				tagClick(routerTagList.value[index])
			}
		}
		function tagClick(item: any) {
			// ????????????????????????????????????
			// router.push(item.path)
			// ????????????tag?????????????????? ???????????????????????? microAppMethod ????????????
			microTagRouterClick(item, router)
		}

		function setVisibleTag(item: any) {
			return state.erpLayout?.routerTagKey === item.path ? 'visible_tag' : ''
		}

		function menuItemClick(e: any, item: any, KeyIndex: number) {
			let data = []
			switch (e.key) {
				case '1':
					data = routerTagList.value.filter((res, index) => {
						return index >= KeyIndex
					})
					break
				case '2':
					data = routerTagList.value.filter((res, index) => {
						return index <= KeyIndex
					})
					break
				case '3':
					data = routerTagList.value.filter((res) => {
						return res.name !== item.name
					})
					break
				case '4':
					data = routerTagList.value.filter((res) => {
						return res.path === item.path
					})
					break
				case '5':
					data = []
					break
			}
			commit('erpLayout/ResetRouterTagList', data || [])
			microResetRouterTag(data)
			if (isTrue(data)) {
				microTagRouterClick(data[0], router)
			} else {
				microEmptyRouterTag()
			}
		}
		return () =>
			!isShowTagList.value || !routerTagList.value.length ? (
				''
			) : (
				<div class="ht_router_list">
					{routerTagList.value.map((item, index) => {
						return (
							<span key={index} style="position: relative;">
								<Dropdown
									trigger={['contextmenu']}
									getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
									v-slots={{
										overlay: () => {
											return (
												<a-menu onClick={(e: any) => menuItemClick(e, item, index)} style="width:150px">
													<a-menu-item key="1">??????????????????</a-menu-item>
													<a-menu-item key="2">??????????????????</a-menu-item>
													<a-menu-item key="3">??????????????????</a-menu-item>
													<a-menu-item key="4">??????????????????</a-menu-item>
													<a-menu-item key="5">??????????????????</a-menu-item>
												</a-menu>
											)
										},
									}}
								>
									<Tag
										v-hover={(e: string) => {
											if (item.hoverTitle) {
												routerTagList.value[index].hover = e === 'mouseenter'
											}
										}}
										{...{
											onClick: () => tagClick(item),
										}}
										onClose={() => {
											tagClose(item, index)
										}}
										class={setVisibleTag(item)}
										closable
										visible={true}
									>
										<span>{item.title}</span>
									</Tag>
								</Dropdown>
								{item.hover && item.hoverTitle && (
									<span style="position: absolute; top: 25px; left: 0px;z-index: 3;background: #EEF4FF;padding: 2px 5px;border-radius: 5px;">
										{item.hoverTitle}
									</span>
								)}
							</span>
						)
					})}
				</div>
			)
	},
})
