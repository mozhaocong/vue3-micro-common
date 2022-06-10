import { defineComponent, ref } from 'vue'
import { Button, Input } from 'ant-design-vue'
import { RFormTable } from '@/components'

export default defineComponent({
	setup() {
		const dataSource = ref([{}])
		const columns: formTableColumnsType = [
			{
				title: '姓名',
				dataIndex: 'name',
				width: '300px',
				row: [{ key: 'name', rules: [{ required: true, message: 'Please select your country!' }] }],
			},
			{
				title: '年龄',
				dataIndex: 'age',
				width: '300px',
				customRender({ record }: any) {
					return (
						<a-form-item name={[0, 'age']} rules={[{ required: true, message: 'Please select your country!' }]}>
							<Input v-model={[record.age, 'value']} />
						</a-form-item>
					)
				},
			},
		]
		return () => (
			<>
				<RFormTable fid={'formTable'} model={dataSource.value} columns={columns} />
				<Button
					onClick={() => {
						dataSource.value.push({})
					}}
				>
					添加
				</Button>
				<Button
					onClick={() => {
						console.log(dataSource.value)
					}}
				>
					测试1
				</Button>
				<Button htmlType={'submit'} {...{ form: 'formTable' }}>
					测试2
				</Button>
			</>
		)
	},
})
