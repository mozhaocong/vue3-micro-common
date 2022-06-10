<template>
	<router-view v-slot="{ Component }">
		<keep-alive :include="includeList">
			<component :is="Component" />
		</keep-alive>
	</router-view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
	name: 'keepAliveView',
	setup() {
		const route = useRoute()
		const state = reactive<{ includeList: any[] }>({
			includeList: ['keepAliveView'],
		})
		watch(
			() => route,
			(newVal: any) => {
				if (newVal.meta.keepAlive && state.includeList.indexOf(newVal.name) === -1) {
					state.includeList.push(newVal.name)
				}
			},
			{ deep: true, immediate: true }
		) // 开启深度监听
		return {
			route,
			...toRefs(state),
		}
	},
})
</script>
