import { defineComponent, onActivated } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import './index.less'
export default defineComponent({
	name: 'kibana',
	setup: function () {
		const iframe = document.createElement('iframe')
		iframe.height = '100%'
		iframe.width = '100%'
		iframe.id = 'kibana_iframe'
		iframe.src = 'http://112.74.182.216:5601/app/kibana#/home?_g=()'
		document.querySelector(`#${import.meta.env.VITE_APP_ID}`)?.appendChild(iframe)
		onActivated(() => {
			try {
				// @ts-ignore
				document.querySelector('#kibana_iframe').style.display = 'block'
			} catch (e) {
				console.log(e)
			}
		})
		onBeforeRouteLeave(() => {
			try {
				// @ts-ignore
				document.querySelector('#kibana_iframe').style.display = 'none'
			} catch (e) {
				console.log(e)
			}
		})
		return () => <div></div>
	},
})
