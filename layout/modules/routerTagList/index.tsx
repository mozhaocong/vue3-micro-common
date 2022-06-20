import { computed, defineComponent, watch } from 'vue'
import { getArrayFilterData, isTrue } from '@/utils'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Dropdown, Tag } from 'ant-design-vue'
import { last } from 'ramda'
import './index.less'
import { microEmptyRouterTag, microTagRouterClick } from '@/microAppMethod'

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
			},
			{ deep: true, immediate: true }
		)

		if (!isTrue(routerTagList.value) && isShowTagList.value) {
			const list = state?.erpLayout?.layoutRouterData || []
			const data = list.filter((item: any) => item.pathName === route.meta.pathName)
			const filterData = getArrayFilterData(data, (item) => {
				if (!isTrue(item.name) || item.children || item?.meta?.hideMenuItem) {
					return false
				}
				return route.name === item.name
			})
			if (isTrue(filterData)) {
				filterData[0].path = route.fullPath
				commit('erpLayout/AddDeleteRouterTagList', { data: filterData[0], type: 'add' })
			}
		}

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
			// 不用微前端可以使用时这个
			// router.push(item.path)
			// 判断当前tag是不是当地环 由于是微前端，在 microAppMethod 统一处理
			microTagRouterClick(item, router)
		}

		function setVisibleTag(item: any) {
			return state.erpLayout?.routerTagKey === item.path ? 'visible_tag' : ''
		}

		return () =>
			!isShowTagList.value || !routerTagList.value.length ? (
				''
			) : (
				<div class="ht_router_list">
					{routerTagList.value.map((item, index) => {
						return (
							<Dropdown
								trigger={['contextmenu']}
								getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
								v-slots={{
									overlay: () => {
										return (
											<a-menu>
												<a-menu-item key="1">关闭左侧标签</a-menu-item>
												<a-menu-item key="2">关闭右侧标签</a-menu-item>
												<a-menu-item key="3">关闭其他标签</a-menu-item>
												<a-menu-item key="4">关闭所有标签</a-menu-item>
											</a-menu>
										)
									},
								}}
							>
								<Tag
									v-hover={(e: any) => {
										console.log('a', e, item)
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
						)
					})}
				</div>
			)
	},
})
