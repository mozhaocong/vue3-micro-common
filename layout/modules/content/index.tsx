import { defineComponent, reactive, watch, KeepAlive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import RouterTagList from '@/layout/modules/routerTagList'
import './index.less'
import { microKeepAliveView } from '@/microAppMethod/util'

export default defineComponent({
	name: 'Content',
	setup() {
		const route = useRoute()
		const state = reactive<{ includeList: any[] }>({
			includeList: ['keepAliveView', ...microKeepAliveView],
		})
		const routerHeight = ref()

		const isMicroRouter = ref(false)
		watch(
			() => route,
			(newVal: any) => {
				isMicroRouter.value = !!newVal?.meta?.isMicro
				if (newVal.meta.keepAlive && state.includeList.indexOf(newVal.name) === -1) {
					state.includeList.push(newVal.name)
				}
			},
			{ deep: true, immediate: true }
		) // 开启深度监听

		onMounted(() => {
			// 给router-view 高度
			const data: any = document.querySelector('.ht_router_list')
			if (!data) return
			const marginBottom: any = getComputedStyle(data).marginBottom.replace('px', '')
			const marginTop: any = getComputedStyle(data).marginTop.replace('px', '')
			const tabListHeight = marginBottom * 1 + marginTop * 1 + data.offsetHeight
			routerHeight.value = `height: calc(100% - ${tabListHeight}px)`
		})

		const defaultComponent =
			import.meta.env?.VITE_CTX && import.meta.env.VITE_CTX === 'false'
				? (scope: any) => scope.Component
				: (scope: any) => <KeepAlive include={state.includeList}>{scope.Component}</KeepAlive>
		return () => (
			<a-layout class={!isMicroRouter.value ? 'ht_layout_content' : ''}>
				<a-layout-content>
					<RouterTagList />
					<div
						style={routerHeight.value}
						class={!isMicroRouter.value ? 'ht_layout_routerView' : 'ht_microRouter_routerView'}
					>
						<router-view
							style="height:100%"
							v-slots={{
								default: defaultComponent,
							}}
						/>
					</div>
				</a-layout-content>
			</a-layout>
		)
	},
})
