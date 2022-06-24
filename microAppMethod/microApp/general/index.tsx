import { defineComponent, onActivated } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import './index.less'
export default defineComponent({
	name: 'kibana',
	setup: function () {
		const iframe = document.createElement('iframe')
		iframe.height = '100%'
		iframe.width = '100%'
		iframe.id = 'general_iframe'
		iframe.src = 'http://47.119.141.146:3000/?orgId=1'
		document.querySelector(`#${import.meta.env.VITE_APP_ID}`)?.appendChild(iframe)
		onActivated(() => {
			try {
				// @ts-ignore
				document.querySelector('#general_iframe').style.display = 'block'
			} catch (e) {
				console.log(e)
			}
		})
		onBeforeRouteLeave(() => {
			try {
				// @ts-ignore
				document.querySelector('#general_iframe').style.display = 'none'
			} catch (e) {
				console.log(e)
			}
		})
		return () => <div></div>
	},
})
