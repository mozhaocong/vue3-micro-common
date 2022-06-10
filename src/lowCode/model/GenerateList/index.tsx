import { defineComponent, ref } from 'vue'
import GenerateCode from '@/lowCode/model/GenerateCode'
import { Button, Input } from 'ant-design-vue'
import { post } from '@/http'
import { testInitial } from '@/lowCode/model/GenerateCode/model/Template/code'
import { isTrue } from '@/utils'
// 低代码开发
export default defineComponent({
	name: 'lowCode',
	setup() {
		let nub = 0
		const generateCodeList = ref<any[]>([nub])
		const pathName = ref('')
		const generateCodeRef = ref()
		async function testClick() {
			generateCodeRef.value.templateRef.dataMerge('columns')

			if (!isTrue(pathName.value)) return
			const data = await post('http://localhost:3080/lowCode/generationCode', {
				path: pathName.value,
				data: testInitial('216126', ['operation']),
				util: 'xxx',
			})
			console.log(data)
		}
		return () => (
			<div>
				<div style="display: flex">
					<Button
						onClick={() => {
							nub++
							generateCodeList.value.push(nub)
						}}
					>
						添加generateCodeList
					</Button>
					<Input v-model={[pathName.value, 'value']} />
					<Button onClick={testClick}>测试</Button>
				</div>

				{generateCodeList.value.map((item, index) => {
					return (
						<div key={item}>
							<GenerateCode
								ref={generateCodeRef}
								onDelete={() => {
									generateCodeList.value.splice(index, 1)
								}}
							/>
							<a-divider />
						</div>
					)
				})}
			</div>
		)
	},
})
