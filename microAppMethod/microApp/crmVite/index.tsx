import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import microApp, { EventCenterForMicroApp } from '@micro-zoe/micro-app'
import { useStore } from 'vuex'
import { isTrue } from '@/utils'
import { microRouterMap } from '@/microAppMethod/util'
import { message } from 'ant-design-vue'
import { erpLayoutModule } from '@/store/modules/erp/public/layout'

export default defineComponent({
	name: 'crmVite',
	setup() {
		const { commit } = useStore()
		const route = useRoute()
		const microKey = route?.meta?.appId
		// 没有appid就不是微前端路由
		if (!microKey) {
			console.warn('没有appid就不是微前端路由')
			return
		}
		const microfilter = microRouterMap.filter((res) => res.appId === microKey)
		// 找不到对应的micro数据就不是微前端路由
		if (!isTrue(microfilter)) {
			console.warn('找不到对应的micro数据就不是微前端路由')
			return
		}
		const data = microfilter[0]
		const windowKey: any = `eventCenterForAppName${data.appId}`
		window[windowKey] = new EventCenterForMicroApp(data.appId) as any
		const microAppData = ref({})
		function microMounted() {
			commit('erpLayout/SetLayoutSpinning', { type: false })
			console.log('microMounted', erpLayoutModule.routerTagList)
			microApp.setData(data.appId, { data: [{ type: 'resetRouterTagList', data: erpLayoutModule.routerTagList }] })
		}

		const basePath = import.meta.env.BASE_URL + route.path?.slice(1, route.path.length) + '#/'
		microAppData.value = { basePath }
		commit('erpLayout/SetLayoutSpinning', { type: true })
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
					error={() => {
						message.error('页面加载失败，请重新刷新页面')
						commit('erpLayout/SetLayoutSpinning', { type: false })
					}}
				/>
			</div>
		)
	},
})
