import { defineComponent, ref } from 'vue'
import RouterList from './modules/routerList'
import Configuration from './modules/configuration'
export default defineComponent({
	name: 'basisPositionAuthority',
	setup() {
		const selectRouterData = ref<ObjectMap>()

		return () => (
			<div style="height: 100%;display: flex;">
				<RouterList
					style="width:300px;height: 100%;"
					onSelect={(item) => {
						selectRouterData.value = item
					}}
				/>
				<Configuration routerData={selectRouterData.value} style="flex:1;height: 100%;" />
			</div>
		)
	},
})
