import { defineComponent } from 'vue'
import SetConfig from '@/lowCode/model/SetConfig'
import SetBasicData from '@/lowCode/model/SetBasicData'
import GenerateList from '@/lowCode/model/GenerateList'
// 低代码开发
export default defineComponent({
	name: 'lowCode',
	setup() {
		return () => (
			<div style="padding: 20px;">
				<SetConfig />
				<a-divider />
				<SetBasicData />
				<a-divider />
				<GenerateList />
			</div>
		)
	},
})
