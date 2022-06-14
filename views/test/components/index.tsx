import { defineComponent, ref } from 'vue'
import FormTest from './modules/Form'
import FormList from './modules/FormList'
import FormAddFormList from './modules/FormAddFormList'
import FormTable from '@/views/test/components/modules/FormTable'
import FormAddFormTable from '@/views/test/components/modules/FormAddFormTable'
import SortableTest from './modules/SortableTest/index'
import MinMaxInputString from '@/components/Common/MinMaxInputString'
import { Button } from 'ant-design-vue'
import JsBarcode from './modules/JsBarcode'
import JsQRCode from './modules/JsQRCode'
export default defineComponent({
	name: 'testChildren1Data2',
	setup() {
		const dataTest = ref()

		return () => (
			<div>
				<div>form</div>
				<FormTest />
				<a-divider />
				<div>FormList</div>
				<FormList />
				<a-divider />
				<div>FormAddFormList</div>
				<FormAddFormList />
				<a-divider />
				<div>FormTable</div>
				<FormTable />
				<a-divider />
				<div>FormAddFormTable</div>
				<FormAddFormTable />
				<a-divider />
				<div>SortableTest</div>
				<SortableTest />
				<a-divider />
				<MinMaxInputString v-model={[dataTest.value, 'value']} />
				<a-divider />
				<JsBarcode />
				<a-divider />
				<JsQRCode />
			</div>
		)
	},
})
