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
		watch(
			() => route,
			(value) => {
				selectedKeys.value = [value.path]
			},
			{ deep: true, immediate: true }
		)

		const isShowSider = computed(() => {
			return !route?.meta?.isMicro
		})

		const sidebarList = computed(() => {
			const pathName = route?.meta?.pathName
			if (!isTrue(pathName)) return []
			const list = state?.erpLayout?.layoutRouterData || []
			const data = list.filter((item: any) => {
				return item.pathName === pathName
			})
			if (!isTrue(data)) return []
			return data[0].children
		})

		function setSidebarItem(data: any) {
			return data.map((item: any) => {
				if (isTrue(item.children)) {
					return (
						<SubMenu class="sub_menu" key={item.path} title={item.title}>
							{setSidebarItem(item.children)}
						</SubMenu>
					)
				} else {
					return (
						<MenuItem
							onClick={() => {
								menuClick(item)
							}}
							class="sub_menu"
							key={item.path}
						>
							{item.title}
						</MenuItem>
					)
				}
			})
		}
		function menuClick(item: any) {
			commit('erpLayout/SETROUTERTAGLIST', { data: item, type: 'add' })
			// erpLayoutModule.SETROUTERTAGLIST({ data: item, type: 'add' })
			router.push(item.path)
		}
		return () =>
			isTrue(sidebarList.value) && isShowSider.value ? (
				<LayoutSider class="ht_sider" collapsible width={240}>
					<Menu
						class="menu"
						// onClick={menuClick}
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
