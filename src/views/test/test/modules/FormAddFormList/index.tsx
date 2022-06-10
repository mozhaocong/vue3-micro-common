import { defineComponent, ref } from 'vue'
import { RFormList, RForm } from '@/components'
import { Button } from 'ant-design-vue'
export default defineComponent({
	setup() {
		const model = ref<ObjectMap>({ list: [{}] })
		const rows: FormRowArray = [
			{ key: 'a', title: 'a' },
			{ key: 'b', title: 'b' },
			{
				key: 'list',
				colProps: {
					span: 24,
				},
				render: () => {
					return (
						<RFormList
							model={model.value.list}
							rowKey={['list']}
							list={[
								{
									key: 'c',
									title: '测试1',
									rules: [{ required: true, message: 'Please select your country!' }],
								},
								{ key: 'd', title: '测试2' },
							]}
						/>
					)
				},
			},
		]
		return () => {
			return (
				<div>
					<RForm fid={'FormAddFormList'} model={model.value} rows={rows} />
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
					<Button htmlType={'submit'} {...{ form: 'FormAddFormList' }}>
						测试2
					</Button>
				</div>
			)
		}
	},
})
