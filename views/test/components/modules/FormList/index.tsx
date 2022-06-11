import { defineComponent, ref } from 'vue'
import { RFormList } from '@/components'
import { Button } from 'ant-design-vue'
export default defineComponent({
	setup() {
		const model = ref<any[]>([{}])
		return () => {
			return (
				<div>
					<RFormList
						fid={'RFormList'}
						model={model.value}
						list={[
							{
								key: ['testa', 'a'],
								title: '测试1',
								rules: [{ required: true, message: 'Please select your country!' }],
							},
							{ key: ['testa', 'b'], title: '测试2' },
						]}
					/>
					<Button
						onClick={() => {
							model.value.push({})
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
					<Button htmlType={'submit'} {...{ form: 'RFormList' }}>
						测试2
					</Button>
				</div>
			)
		}
	},
})
