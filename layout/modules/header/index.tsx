import { computed, defineComponent, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isTrue } from '@/utils'
import { useStore } from 'vuex'
import './index.less'
import { Dropdown, Menu, MenuItem } from 'ant-design-vue'
import { ISMICROCHILD } from '@/microAppMethod'
import { erpLayoutModule } from '@/store/modules/erp/public/layout'

export default defineComponent({
	name: 'Header',
	setup() {
		function getTitle(data: string) {
			const titleMap: ObjectMap = {
				ccf: '客诉系统',
				childOmsVite: '订单系统2',
				childCrmVite: '客户系统',
			}
			return titleMap[data] ?? data
		}

		const { state, dispatch } = useStore()
		const owm = computed<ObjectMap>(() => {
			return state?.erpLogin?.owm || []
		})
		const router = useRouter()
		const route = useRoute()

		// const selectedKeys = ref<string[]>([(useRoute()?.meta?.pathName as string) || ''])

		const selectedKeys = computed(() => {
			return [erpLayoutModule.headerSelectedKey]
		})

		// 是否显示header
		const isHeader = computed(() => {
			return !ISMICROCHILD && !route?.meta?.isMicroModel
		})

		watch(
			() => route,
			(value) => {
				erpLayoutModule.SetHeaderSelectedKey((value?.meta?.pathName as string) || '')
			},
			{ deep: true, immediate: true }
		)

		const headList = computed<any[]>(() => {
			const list = state.erpLayout?.layoutRouterData || []
			return list.map((item: any) => {
				return { title: item.pathName, name: item.pathName }
			})
		})
		function menuClick(item: any) {
			const list = state?.erpLayout?.layoutRouterData || []
			const data = list.filter((res: any) => res.pathName === item.key)
			if (isTrue(data)) {
				const routerData = data[0]
				if (routerData?.meta?.isMicro) {
					router.push(routerData.path || '/')
				} else {
					router.push(routerData?.children[0]?.path || '/')
				}
			}
		}
		return () =>
			!isHeader.value ? (
				''
			) : (
				<div id="ht_header">
					<div class="ht_logo">LOGO</div>
					<Menu
						class="ht_header_nav"
						theme="dark"
						mode="horizontal"
						selectedKeys={selectedKeys.value}
						onClick={menuClick}
					>
						{headList.value.map((item) => {
							return (
								<MenuItem class="ht_menu_item" key={item.name}>
									{getTitle(item.title)}
								</MenuItem>
							)
						})}
					</Menu>
					<Dropdown
						class="ht_header_dropdown"
						v-slots={{
							overlay: () => {
								return (
									<Menu>
										<MenuItem>修改密码</MenuItem>
										<MenuItem
											onClick={() => {
												dispatch('erpLogin/signOut')
												// erpLoginModule.signOut()
											}}
										>
											退出登录
										</MenuItem>
									</Menu>
								)
							},
						}}
					>
						<div>{owm.value.real_name}</div>
					</Dropdown>
				</div>
			)
	},
})
