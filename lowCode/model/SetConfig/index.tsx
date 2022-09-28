import { defineComponent, ref } from 'vue'
import { businessOptObject } from '@/config'
import { copyText, objectToArray } from '@/utils'
// 低代码开发
export default defineComponent({
	name: 'setConfig',
	setup() {
		const data: ObjectMap = {}
		for (const key in businessOptObject) {
			data[key] = key + ' : ' + JSON.stringify(businessOptObject[key])
		}
		const configSelect = ref<any[]>([])
		function filterOption(inputValue: any, option: any): boolean {
			return option.label.includes(inputValue) || option.value.includes(inputValue)
		}
		return () => (
			<div style="display: flex;">
				<a-select
					allowClear
					labelInValue
					style={'width:355px'}
					v-model={[configSelect.value, 'value']}
					mode="multiple"
					autoClearSearchValue={false}
					options={objectToArray(data)}
					filterOption={filterOption}
				/>
				<div style="flex: 1;max-height: 100px;overflow: auto; box-sizing: border-box;padding: 0 10px;">
					{configSelect.value.map((item) => {
						return (
							<div
								style="margin:  10px 0;cursor: pointer; "
								onClick={() => {
									copyText(item.value)
								}}
							>
								{item.label}
							</div>
						)
					})}
				</div>
			</div>
		)
	},
})
