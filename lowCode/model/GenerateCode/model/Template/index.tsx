import { defineComponent, PropType, ref } from 'vue'
import { Button, Input } from 'ant-design-vue'
import { setTemplate } from '@/lowCode/model/GenerateCode/model/Template/util'
const Props = {
	reg: {
		type: String as PropType<string>,
		default: '',
	},
}
export default defineComponent({
	name: 'template',
	props: Props,
	setup(prop, { expose }) {
		const generateTemplate = ref('')
		const templateType = ref('table')
		const templateData = ref<string[]>([])
		const valueType = ref<ObjectMap>({})

		const fromMapType = [
			{ value: '', label: '默认' },
			{ value: 'config', label: 'config' },
			{ value: 'basic', label: 'basic' },
		]
		const tableMapType = [
			{ value: '', label: '默认' },
			{ value: 'config', label: 'config' },
			{ value: 'render', label: 'render' },
		]

		function dataMerge(key: string) {
			const data = templateData.value.map((item) => {
				const object = valueType.value[item]
				return { title: item, ...object }
			})

			setTemplate(data, templateType.value, key)
		}

		expose({ dataMerge: dataMerge })

		function generateClick() {
			function addRegString(value: string) {
				return value.replace(/\\/g, '\\')
			}
			const regData = new RegExp(addRegString(prop.reg), 'g')
			const returnData: string[] = generateTemplate.value.match(regData) || []
			const data: ObjectMap = {}
			returnData.forEach((item) => {
				data[item] = { type: '', value: '' }
			})
			valueType.value = data
			templateData.value = returnData
		}

		const buttonListMap: ObjectMap = {
			table: ['columns', 'dataSource', 'code'],
			search: ['columns'],
			form: ['columns', 'code'],
		}

		function setButton() {
			const data = buttonListMap[templateType.value] as any[]
			return data.map((item) => {
				return (
					<Button
						onClick={() => {
							dataMerge(item)
						}}
					>
						生成{item}
					</Button>
				)
			})
		}

		return () => (
			<div>
				<div>
					<a-radio-group v-model={[templateType.value, 'value']}>
						<a-radio value={'table'}>r-table</a-radio>
						<a-radio value={'search'}>r-search</a-radio>
						<a-radio value={'form'}>r-from</a-radio>
					</a-radio-group>
				</div>
				<div>
					<a-textarea v-model={[generateTemplate.value, 'value']} rows={4} />
					<a-button onClick={generateClick}>确定</a-button>
				</div>
				{templateData.value.map((item) => {
					return (
						<div style="display: flex; align-items: center;">
							{item}
							<a-radio-group
								v-model={[valueType.value[item].type, 'value']}
								options={templateType.value === 'table' ? tableMapType : fromMapType}
							/>
							{['config', 'basic'].includes(valueType.value[item]?.type || '') && (
								<Input style={{ flex: 1 }} v-model={[valueType.value[item].typeValue, 'value']} />
							)}
						</div>
					)
				})}
				{setButton()}
			</div>
		)
	},
})
