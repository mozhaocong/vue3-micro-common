import { defineComponent, ref } from 'vue'
import { RForm, RFormTable } from '@/components'
import { Button, Input } from 'ant-design-vue'
export default defineComponent({
	setup() {
		const model = ref<ObjectMap>({ list: [{}] })
		const columns: formTableColumnsType = [
			{
				title: '姓名',
				dataIndex: 'name',
				width: '300px',
				row: [
					{
						key: 'name',
						rules: [{ required: true, message: 'Please select your country!' }],
					},
				],
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
		const rows: FormRowArray = [
			{ key: 'a', title: 'a' },
			{ key: 'b', title: 'b' },
			{
				key: 'list',
				colProps: {
					span: 24,
				},
				render: ({ dataSource }) => {
					return <RFormTable rowKey={['list']} model={dataSource?.list} columns={columns} />
					// return <div>1111</div>
				},
			},
		]
		return () => {
			return (
				<div>
					<RForm fid={'FormAddFormTable'} model={model.value} rows={rows} />
					<Button
						onClick={() => {
							model.value.list.push({})
						}}
					>
						添加
					</Button>
					<Button
						onClick={() => {
							console.log(model.value)
						}}
					>
						测试1
					</Button>
					<Button htmlType={'submit'} {...{ form: 'FormAddFormTable' }}>
						测试2
					</Button>
				</div>
			)
		}
	},
})
