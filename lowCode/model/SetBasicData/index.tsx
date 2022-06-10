import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { isTrue } from '@/utils'
import FormBasicData from '@/components/Business/BasicData'
// 低代码开发
export default defineComponent({
	name: 'setBasicData',
	setup() {
		const vuexStore = useStore()
		const basicSelect = ref<any[]>([])
		const data: ObjectMap = {}
		for (const key in vuexStore.state) {
			const listMapData = vuexStore.state[key].listMapData
			if (isTrue(listMapData)) {
				data[key] = listMapData
			}
		}
		const options = ref<any[]>([])
		if (isTrue(data)) {
			for (const key in data) {
				const dataKeyItem = data[key]
				const pushList = []
				for (const itemKey in dataKeyItem) {
					pushList.push({ label: dataKeyItem[itemKey], value: itemKey })
				}
				options.value.push({ options: pushList, label: key })
			}
		}
		// function filterOption(inputValue: any, option: any): boolean {
		// 	return option.label.includes(inputValue) || option.value.includes(inputValue)
		// }
		return () => (
			<div style="display: flex;">
				<a-select
					allowClear
					labelInValue
					style={'width:355px'}
					v-model={[basicSelect.value, 'value']}
					mode="multiple"
					autoClearSearchValue={false}
					options={options.value}
					// filterOption={filterOption}
				/>
				<div style="width: 200px;padding: 10px;">
					{basicSelect.value.map((item) => {
						return (
							<div style="width: 100%">
								{item.label}
								<FormBasicData style="width: 100%" placeholder={item.label} prop={item.value} />
							</div>
						)
					})}
				</div>
			</div>
		)
	},
})
