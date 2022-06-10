import { defineComponent, ref } from 'vue'
import FormTest from './modules/Form'
import FormList from './modules/FormList'
import FormAddFormList from './modules/FormAddFormList'
import FormTable from '@/views/test/test/modules/FormTable'
import FormAddFormTable from '@/views/test/test/modules/FormAddFormTable'
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
				{/*<div>form</div>*/}
				{/*<FormTest />*/}
				{/*<a-divider />*/}
				{/*<div>FormList</div>*/}
				{/*<FormList />*/}
				{/*<a-divider />*/}
				{/*<div>FormAddFormList</div>*/}
				{/*<FormAddFormList />*/}
				{/*<a-divider />*/}
				{/*<div>FormTable</div>*/}
				{/*<FormTable />*/}
				{/*<a-divider />*/}
				{/*<div>FormAddFormTable</div>*/}
				{/*<FormAddFormTable />*/}
				{/*<div>SortableTest</div>*/}
				{/*<SortableTest />*/}

				<MinMaxInputString v-model={[dataTest.value, 'value']} />
				<JsBarcode />
				<JsQRCode />
				<Button
					onClick={() => {
						console.log(dataTest.value)
					}}
				>
					是啥水果
				</Button>
			</div>
		)
	},
})
