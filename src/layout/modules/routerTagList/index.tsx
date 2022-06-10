import { computed, defineComponent } from 'vue'
import { getArrayFilterData, isTrue } from '@/utils'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Tag } from 'ant-design-vue'
import { last } from 'ramda'
import './index.less'
import { microEmptyRouterTag, microTagRouterClick } from '@/microAppMethod'

export default defineComponent({
	name: 'RouterTagList',
	setup() {
		const routerTagList = computed<any[]>(() => {
			return state?.erpLayout?.routerTagList || []
		})
		const route = useRoute()
		const { state, commit } = useStore()

		if (!isTrue(routerTagList.value)) {
			const list = state?.erpLayout?.layoutRouterData || []
			const data = list.filter((item: any) => item.pathName === route.meta.pathName)
			const filterData = getArrayFilterData(data, (item) => {
				if (!isTrue(item.name) || item.children) {
					return false
				}
				return route.name === item.name
			})
			if (isTrue(filterData)) {
				commit('erpLayout/SETROUTERTAGLIST', { data: filterData[0], type: 'add' })
			}
		}

		function tagClose(item: any, index: number) {
			commit('erpLayout/SETROUTERTAGLIST', { data: item, type: 'delete' })
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
				microTagRouterClick(last(routerTagList.value))
			} else {
				microTagRouterClick(routerTagList.value[index])
			}
		}
		function tagClick(item: any) {
			// 不用微前端可以使用时这个
			// router.push(item.path)
			// 判断当前tag是不是当地环 由于是微前端，在 microAppMethod 统一处理
			microTagRouterClick(item)
		}

		return () => (
			<div class="ht_router_list">
				{routerTagList.value.map((item, index) => {
					return (
						<Tag
							{...{ onClick: () => tagClick(item) }}
							onClose={() => {
								tagClose(item, index)
							}}
							class={route.name === item.name && 'visible_tag'}
							closable
							visible={true}
						>
							{item.title}
						</Tag>
					)
				})}
			</div>
		)
	},
})
