import { defineComponent, ref } from 'vue'
import GroupTree from './module/groupTree'
import GroupData from './module/groupData'
import './index.less'
import { clone } from 'ramda'

export default defineComponent({
	name: 'basisPageGroup',
	setup() {
		const recordData = ref()
		return () => (
			<div class="groupLayout">
				<GroupTree
					class="groupTreeModule"
					onClick={(item) => {
						recordData.value = clone(item)
					}}
				/>
				<GroupData class="groupDataModule" recordData={recordData.value} />
			</div>
		)
	},
})
