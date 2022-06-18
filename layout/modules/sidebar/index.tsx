import { computed, defineComponent, ref, watch } from 'vue'
import { isTrue } from '@/utils'
import { useRoute, useRouter } from 'vue-router'
import './index.less'
import { LayoutSider, Menu, MenuItem, SubMenu } from 'ant-design-vue'
import { useStore } from 'vuex'
export default defineComponent({
	name: 'Sidebar',
	setup() {
		const route = useRoute()
		const router = useRouter()
		const { state, commit } = useStore()
		let defPathName = route?.meta?.pathName
		const selectedKeys = computed(() => {
			return [state.erpLayout?.sidebarSelectedKey]
		})
		const sidebarList = computed(() => {
			console.log(state.erpLayout?.sidebarList)
			return state.erpLayout?.sidebarList
		})

		const isShowSidebar = computed(() => {
			return !route?.meta?.isMicro
		})
		watch(
			() => route,
			(value) => {
				if (defPathName !== route?.meta?.pathName || !isTrue(sidebarList.value)) {
					commit('erpLayout/SetSidebarList', setSidebarListData())
				}
				defPathName = route?.meta?.pathName
				commit('erpLayout/SetSidebarSelectedKey', value.path)
			},
			{ deep: true, immediate: true }
		)

		function setSidebarListData() {
			const pathName = route?.meta?.pathName
			if (!isTrue(pathName)) return []
			const list = state?.erpLayout?.layoutRouterData || []
			const data = list.filter((item: any) => {
				return item.pathName === pathName
			})
			if (!isTrue(data)) return []
			return data[0].children
		}

		function setSidebarItem(data: any) {
			return data.map((item: any) => {
				if (item?.meta?.hideMenuItem) {
					return ''
				}
				if (isTrue(item.children) && !item?.meta?.showMenuItem) {
					return (
						<SubMenu class="sub_menu" key={item?.meta?.menuItemKey} title={item.title}>
							{setSidebarItem(item.children)}
						</SubMenu>
					)
				} else {
					if (item?.meta?.showMenuItem) {
						return setSidebarItem(item.children)
					}
					return (
						<MenuItem
							onClick={() => {
								menuClick(item)
							}}
							class="sub_menu"
							key={item?.meta?.menuItemKey}
						>
							{item.title}
						</MenuItem>
					)
				}
			})
		}
		function menuClick(item: any) {
			commit('erpLayout/AddDeleteRouterTagList', { data: item, type: 'add' })
			router.push(item.path)
		}
		return () =>
			isTrue(sidebarList.value) && isShowSidebar.value ? (
				<LayoutSider class="ht_sider" collapsible width={240}>
					<Menu
						class="menu"
						selectedKeys={selectedKeys.value}
						theme="dark"
						mode="inline"
						style={{ height: '100%', borderRight: 0 }}
					>
						{setSidebarItem(sidebarList.value)}
					</Menu>
				</LayoutSider>
			) : (
				''
			)
	},
})
