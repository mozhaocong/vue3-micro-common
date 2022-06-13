import { computed, defineComponent, ref, watch } from 'vue'
import { isTrue } from '@/utils'
import { useRoute, useRouter } from 'vue-router'
import './index.less'
import { LayoutSider, Menu, MenuItem, SubMenu } from 'ant-design-vue'
import { useStore } from 'vuex'
export default defineComponent({
	name: 'Sidebar',
	setup() {
		const selectedKeys = ref<string[]>([])
		const route = useRoute()
		const router = useRouter()
		const { state, commit } = useStore()
		const defPathName = route?.meta?.pathName
		const sidebarList = ref([])
		const isShowSider = ref(true)
		watch(
			() => route,
			(value) => {
				if (defPathName !== route?.meta?.pathName || !isTrue(sidebarList.value)) {
					sidebarList.value = setSidebarListData()
				}
				if (!route?.meta?.isMicro !== isShowSider.value) {
					isShowSider.value = !route?.meta?.isMicro
				}
				const path = value?.meta?.pagePath ?? value.path
				selectedKeys.value = [path as string]
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
			commit('erpLayout/SETROUTERTAGLIST', { data: item, type: 'add' })
			router.push(item.path)
		}
		return () =>
			isTrue(sidebarList.value) && isShowSider.value ? (
				<LayoutSider class="ht_sider" collapsible width={240}>
					<Menu
						class="menu"
						v-model={[selectedKeys.value, 'selectedKeys']}
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
