import { defineComponent, reactive, ref } from 'vue'
import { isTrue } from '@/utils'
import FormRadioGroup from '@/components/Business/RadioGroup'
import Template from './model/Template'
import { Button } from 'ant-design-vue'

export default defineComponent({
	name: 'generateTemplate',
	emits: ['delete'],
	setup(props, { emit, expose }) {
		const defReg = reactive([
			{ value: '[^\\,\\，]+', label: '逗号' },
			{ value: '[^\\s\\n]+', label: '空格换行' },
			{ value: '[^\\n]+', label: '换行' },
		])

		const templateRef = ref()

		const reg = ref<string>('')
		const localStorageKey = 'generateTemplate'
		const localStorageRegList = ref<any[]>([])

		expose({ templateRef: templateRef })

		function getLocalStorageDataList() {
			let data: any = window.localStorage.getItem(localStorageKey) || '{}'
			data = JSON.parse(data)
			const list = []
			if (data.regData) {
				for (const dataKey in data.regData) {
					list.push({ value: data.regData[dataKey], label: dataKey })
				}
			}
			localStorageRegList.value = list
			reg.value = list[0]?.value || defReg[0].value
		}
		getLocalStorageDataList()

		function saveReg() {
			let data: any = window.localStorage.getItem(localStorageKey) || '{}'
			data = JSON.parse(data)
			if (!data.regData) {
				data.regData = {}
			}
			data.regData[reg.value] = reg.value
			window.localStorage.setItem(localStorageKey, JSON.stringify(data))
			getLocalStorageDataList()
		}

		return () => (
			<div style={{ width: '80%', margin: 'auto' }}>
				<Button
					onClick={() => {
						emit('delete')
					}}
				>
					删除
				</Button>
				<FormRadioGroup options={defReg} isAllButton={false} v-model={[reg.value, 'value']} title="默认：" />
				{isTrue(localStorageRegList.value) && (
					<FormRadioGroup
						options={localStorageRegList.value}
						isAllButton={false}
						v-model={[reg.value, 'value']}
						title="自定义保存："
					/>
				)}
				<div style="display: flex;align-items: center;">
					<span>正则:</span>
					<a-input style={{ flex: 1 }} v-model={[reg.value, 'value']} />
					<a-button onClick={saveReg}>保存</a-button>
				</div>
				<Template reg={reg.value} ref={templateRef} />
			</div>
		)
	},
})
