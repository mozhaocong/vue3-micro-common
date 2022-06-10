<template>
	<a-config-provider :locale="locale">
		<router-view v-slot="{ Component }" style="overflow: hidden; flex: 1">
			<component :is="Component" />
		</router-view>
	</a-config-provider>
</template>

<script lang="ts">
import zhCN from 'ant-design-vue/lib/locale/zh_CN'
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'App',
	components: {},
	setup() {
		return {
			locale: zhCN,
		}
	},
})
</script>

<style></style>
