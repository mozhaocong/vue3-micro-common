import { computed, defineComponent } from 'vue'
import Header from './modules/header'
import Sidebar from './modules/sidebar'
import Content from './modules/content/index'
import BuoyIcon from './modules/buoyIcon/index'
import { useStore } from 'vuex'
import './index.less'

export default defineComponent({
	name: 'layout',
	setup() {
		const { state } = useStore()
		const spinning = computed(() => {
			return state?.erpLayout?.layoutSpinning ?? false
		})
		return () => (
			<a-spin wrapperClassName="ht_layout_wrapper_spin" class="layout_spin" spinning={spinning.value}>
				<a-layout style="height: 100%">
					<Header />
					<a-layout>
						<Sidebar />
						<Content />
					</a-layout>
					<BuoyIcon />
				</a-layout>
			</a-spin>
		)
	},
})
