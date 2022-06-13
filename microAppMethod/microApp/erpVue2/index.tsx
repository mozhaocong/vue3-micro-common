import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { isTrue } from '@/utils'
import { microModelMap, microRouterMap } from '@/microAppMethod/util'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
export default defineComponent({
	name: 'erpVue2',
	setup() {
		const route = useRoute()
		const { commit } = useStore()
		const microKey = route?.meta?.appId
		const isMicroModel = !!route?.meta?.isMicroModel
		// 没有appid就不是微前端路由
		if (!microKey) return
		let microfilter = []
		if (isMicroModel) {
			microfilter = microModelMap.filter((res) => res.appId === microKey)
		} else {
			microfilter = microRouterMap.filter((res) => res.appId === microKey)
		}
		// 找不到对应的micro数据就不是微前端路由
		if (!isTrue(microfilter)) return
		const microData = microfilter[0]
		commit('erpLayout/SetLayoutSpinning', { type: true, time: 20000 })
		return () => (
			<div>
				<micro-app
					style="height:100vh;overflow: auto;"
					name={microData.appId}
					url={microData.appUrl}
					baseroute={microData.baseRoute}
					keep-alive
					error={() => {
						message.error('页面加载失败，请重现刷新页面')
						commit('erpLayout/SetLayoutSpinning', { type: false })
					}}
					onMounted={() => {
						commit('erpLayout/SetLayoutSpinning', { type: false })
					}}
				/>
			</div>
		)
	},
})
