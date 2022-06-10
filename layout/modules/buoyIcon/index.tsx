import { computed, defineComponent, ref } from 'vue'
import { BlockOutlined } from '@ant-design/icons-vue'
import './index.less'
import { Dropdown, Menu, MenuItem } from 'ant-design-vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
	name: 'BuoyIcon',
	setup() {
		const { state } = useStore()
		const router = useRouter()
		const route = useRoute()
		let defRout = '/'
		const data = computed(() => {
			if (!route?.meta?.isMicroModel) {
				defRout = route.path
			}
			return [{ path: defRout, title: '中台', name: '' }, ...(state?.erpLayout?.microModelList || [])]
		})
		function MenuItemClick(item: any) {
			router.push(item.path)
		}
		return () =>
			data.value.length === 1 ? (
				''
			) : (
				<div class="buoyIcon">
					<Dropdown
						placement="top"
						v-slots={{
							overlay: () => {
								return (
									<Menu>
										{data.value.map((item: any) => {
											return <MenuItem onClick={() => MenuItemClick(item)}>{item.title}</MenuItem>
										})}
									</Menu>
								)
							},
						}}
					>
						<div class="buoyIcon_radius">
							<BlockOutlined />
						</div>
					</Dropdown>
				</div>
			)
	},
})
