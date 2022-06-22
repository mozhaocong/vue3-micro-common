import { defineComponent } from 'vue'
import Header from './modules/header'
import Sidebar from './modules/sidebar'
import Content from './modules/content/index'
import BuoyIcon from './modules/buoyIcon/index'

export default defineComponent({
	name: 'layout',
	setup() {
		return () => (
			<a-layout style="height: 100%">
				<Header />
				<a-layout>
					<Sidebar />
					<Content />
				</a-layout>
				<BuoyIcon />
			</a-layout>
		)
	},
})
