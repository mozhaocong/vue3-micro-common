<template>
	<a-config-provider :locale="locale">
		<a-spin wrapperClassName="ht_layout_wrapper_spin" class="layout_spin" :spinning="spinning">
			<router-view v-slot="{ Component }" style="overflow: hidden; flex: 1">
				<component :is="Component" />
			</router-view>
		</a-spin>
	</a-config-provider>
</template>

<script lang="ts">
import zhCN from 'ant-design-vue/lib/locale/zh_CN'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
	name: 'App',
	components: {},
	setup() {
		const { state } = useStore()
		const spinning = computed(() => {
			return state?.erpLayout?.layoutSpinning ?? false
		})
		return {
			locale: zhCN,
			spinning,
		}
	},
})
</script>

<style>
.ht_layout_wrapper_spin {
	height: 100%;
}
.ht_layout_wrapper_spin > .ant-spin-container {
	height: 100%;
}
</style>
