import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import microApp, { EventCenterForMicroApp } from '@micro-zoe/micro-app'
import { useStore } from 'vuex'
import { isTrue } from '@/utils'
import { microRouterMap } from '@/microAppMethod/util'

export default defineComponent({
	name: 'ccfVite',
	setup() {
		const { state, commit } = useStore()
		const route = useRoute()
		const microKey = route?.meta?.appId
		// 没有appid就不是微前端路由
		if (!microKey) return
		const microfilter = microRouterMap.filter((res) => res.appId === microKey)
		// 找不到对应的micro数据就不是微前端路由
		if (!isTrue(microfilter)) return
		const data = microfilter[0]
		const windowKey: any = `eventCenterForAppName${data.appId}`
		window[windowKey] = new EventCenterForMicroApp(data.appId) as any
		const microAppData = ref({})
		function microMounted() {
			commit('erpLayout/SETLAYOUTSPINNING', false)
			microApp.setData(data.appId, { data: [{ type: 'resetRouterTagList', data: state?.erpLayout?.routerTagList }] })
		}

		const basePath = import.meta.env.BASE_URL + route.path?.slice(1, route.path.length) + '#/'
		microAppData.value = { basePath }
		commit('erpLayout/SETLAYOUTSPINNING', true)
		return () => (
			<div>
				<micro-app
					style="height: 100%"
					data={microAppData.value}
					name={data.appId}
					inline
					disablesandbox
					onMounted={microMounted}
					url={data.appUrl}
				/>
			</div>
		)
	},
})
