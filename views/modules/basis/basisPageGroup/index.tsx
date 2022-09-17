import { defineComponent, ref } from 'vue'
import GroupTree from './module/groupTree'
import GroupData from './module/groupData'
import './index.less'

export default defineComponent({
	name: 'basisPageGroup',
	setup() {
		const recordData = ref()
		return () => (
			<div class="groupLayout">
				<GroupTree
					class="groupTreeModule"
					onClick={() => {
						console.log('e')
					}}
				/>
				<GroupData class="groupDataModule" />
			</div>
		)
	},
})
