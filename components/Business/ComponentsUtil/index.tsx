import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { routeToRouterTagListData } from '@/utils'
import { useStore } from 'vuex'

export default defineComponent({
	setup(porps, { expose }) {
		const route = useRoute()
		const { commit } = useStore()
		function deleteRouter() {
			const routeData: ObjectMap = routeToRouterTagListData(route)
			commit('erpLayout/AddDeleteRouterTagList', { type: 'delete', data: routeData })
		}
		expose({ deleteRouter })
	},
})
