import { defineComponent } from 'vue'
import RouterList from './modules/routerList'
import Configuration from './modules/configuration'
export default defineComponent({
	name: 'basisPositionAuthority',
	setup() {
		return () => (
			<div style="height: 100%;display: flex;">
				<RouterList style="width:300px;height: 100%;" />
				<Configuration style="flex:1;height: 100%;" />
			</div>
		)
	},
})
