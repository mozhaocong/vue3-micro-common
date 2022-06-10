import { defineComponent, ref } from 'vue'
import { FormConfig, RForm } from '@/components'
import { defaultRowProps } from '@/config'
import { Button } from 'ant-design-vue'

export default defineComponent({
	setup() {
		const model = ref<ObjectMap>({ formValue: { value: 1 }, array: [{ a: '163473' }] })
		class FormRow {
			data: FormRowArray
			// eslint-disable-next-line
      constructor(formModel?: ObjectMap) {
				this.data = [
					{
						key: 'asgasg',
						title: '普通',
					},
					{
						title: '数组测试1',
						key: ['array', 0, 'a'],
						// display: ({ dataSource }) => {
						// 	return !(dataSource?.asgasg === 'asd')
						// },
						// props: ({ dataSource }) => {
						// 	const disabled = dataSource?.asgasg === 'zxc'
						// 	return { disabled: disabled }
						// },
						props: { disabled: true },
						// key: 'gasdasd',
						// rules: [{ required: true, message: 'Please select your country!' }],
					},
					{
						title: '数组测试2',
						key: ['array', 8, 'a'],
						// rules: [{ required: true, message: 'Please select your country!' }],
					},
					{
						title: '数组测试3',
						key: ['array', 'a', 'a111'],
						// rules: [{ required: true, message: 'Please select your country!' }],
					},
					{
						title: '正常数据',
						key: 'test',
						rules: [{ required: true, message: 'Please select your country!' }],
					},
					{
						title: '测试2',
						key: ['formValue', 'value'],
						component: <FormConfig />,
						keys: [
							[['formValue', 'value'], 'value'],
							[['formValue', 'label'], 'label'],
						],
						props: {
							prop: 'baseStatus',
						},
						rules: [{ required: true, message: 'Please select your country!' }],
					},
				]
			}
		}
		const fromRow = new FormRow().data
		return () => (
			<div>
				<RForm
					fid="tableFrom"
					rows={fromRow}
					rowProps={defaultRowProps}
					model={model.value}
					finish={(value) => {
						console.log(value)
					}}
					finishFailed={(value) => {
						console.log(value)
					}}
				/>
				<Button htmlType="submit" {...{ form: 'tableFrom' }}>
					测试
				</Button>
			</div>
		)
	},
})
