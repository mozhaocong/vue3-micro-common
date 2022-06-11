import { computed, defineComponent, ref } from 'vue'
import { BlockOutlined } from '@ant-design/icons-vue'
import './index.less'
import { Dropdown, Menu, MenuItem } from 'ant-design-vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { getUrlPathSearch } from '@/utils'
import { ISMICROCHILD } from '@/microAppMethod'

export default defineComponent({
	name: 'BuoyIcon',
	setup() {
		const { state } = useStore()
		const router = useRouter()
		const route = useRoute()
		const defRout = ref('/')
		const isBuoyIconShow = ref(!ISMICROCHILD)
		const data = computed(() => {
			//有bug在微前端子应用时地址报错, 用点击跳转时更新路由信息
			return [{ path: defRout.value, title: '中台', name: 'main' }, ...(state?.erpLayout?.microModelList || [])]
		})

		function setMainPath() {
			// 可以直接获取url上的参数和路由 有问题在改route
			const { pathSearch } = getUrlPathSearch()
			console.log(pathSearch)
			defRout.value = pathSearch
		}

		function MenuItemClick(item: any) {
			if (!route?.meta?.isMicroModel && item.name === 'main') return
			setMainPath()
			router.push(item.path)
		}
		return () =>
			data.value.length === 1 || !isBuoyIconShow.value ? (
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
