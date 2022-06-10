import { defineComponent } from 'vue'
export default defineComponent({
	name: 'NotFind',
	setup() {
		return () => (
			<div style={{ height: '90vh' }}>
				<div class="page404">404</div>
				<div class="subtitle">很抱歉，您访问的页面不存在。</div>
				<div style={{ textAlign: 'center' }}>
					<router-link to="/">Go Home</router-link>
				</div>
			</div>
		)
	},
})
