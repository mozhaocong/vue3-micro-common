import { defineComponent, reactive, watch, KeepAlive, ref } from 'vue'
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
		return () => (
			<a-layout class={!isMicroRouter.value ? 'ht_layout_content' : ''}>
				<a-layout-content>
					<RouterTagList />
					<div style="height: 100%" class={!isMicroRouter.value ? 'ht_layout_routerView' : ''}>
						<router-view
							key={route.fullPath}
							style="height: 100%"
							v-slots={{
								default: (scope: any) => (
									<KeepAlive key={route.fullPath} include={state.includeList}>
										{scope.Component}
									</KeepAlive>
								),
							}}
						/>
					</div>
				</a-layout-content>
			</a-layout>
		)
	},
})
