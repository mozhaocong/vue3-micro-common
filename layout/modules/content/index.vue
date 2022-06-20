<template>
	<a-layout :class="!isMicroRouter.value ? 'ht_layout_content' : ''">
		<a-layout-content>
			<RouterTagList />
			<div style="height: 100%" :class="!isMicroRouter.value ? 'ht_layout_routerView' : ''">
				<router-view
					:class="!isMicroRouter.value ? 'ht_layout_routerView' : ''"
					:key="route.fullPath"
					v-slot="{ Component }"
					style="height: 100%"
				>
					<keep-alive :key="route.fullPath" :include="includeList">
						<component :is="Component" :key="route.fullPath" />
					</keep-alive>
				</router-view>
			</div>
		</a-layout-content>
	</a-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
import { microKeepAliveView } from '@/microAppMethod/util'
export default defineComponent({
	name: 'keepAliveView',
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
		return {
			route,
			isMicroRouter,
			...toRefs(state),
		}
	},
})
</script>
