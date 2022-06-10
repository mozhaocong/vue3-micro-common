import { defineComponent, onActivated } from 'vue'
import { useRoute } from 'vue-router'
import microApp from '@micro-zoe/micro-app'
const defRoure = ''
export default defineComponent({
	name: 'my-page',
	setup() {
		const route = useRoute()
		onActivated(() => {
			// console.log('onActivated', defRoure, route.fullPath)
			// if (defRoure !== route.fullPath) {
			// 	const replace = route.fullPath.replace('/microAppErp/my-page', '')
			// 	microApp.setData('app1', { replace: replace })
			// 	defRoure = route.fullPath
			// }
			const replace = route.fullPath.replace('/microAppErp/my-page', '')
			microApp.setData('app1', { replace: replace })
		})
		return () => (
			<div>
				<micro-app
					name="app1"
					url="http://10.17.201.63:8002/child/vue3/"
					baseroute="/vue3/microAppErp/my-page"
					keep-alive
				/>
			</div>
		)
	},
})
