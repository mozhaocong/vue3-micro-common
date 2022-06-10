import { defineComponent, markRaw, PropType } from 'vue'
import { valueFormat } from '@/config'
import { RangePicker } from 'ant-design-vue'
import { isString, isTrue } from '@/utils'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
const propsData = {
	value: {
		type: Array as PropType<any[]>,
	},
	startTime: {
		type: [String, Object] as PropType<Dayjs | string>,
	},
	endTime: {
		type: [String, Object] as PropType<Dayjs | string>,
	},
} as const
const RRangePicker = defineComponent({
	props: propsData,
	name: 'RRangePicker',
	emits: ['update:value', 'update:startTime', 'update:endTime', 'onChange'],
	setup(props, context) {
		function onChange(value: any[], mode: any) {
			if (!isTrue(value)) {
				value = []
			}
			context.emit('onChange', value, mode)
			context.emit('update:value', value)
			context.emit('update:startTime', value[0])
			context.emit('update:endTime', value[1])
		}
		function getTimeData() {
			const data = props.value || []
			let startTime: any = props.startTime ?? data[0]
			let endTime: any = props.endTime ?? data[1]
			const reData = []
			if (isTrue(startTime)) {
				if (isString(startTime)) {
					startTime = dayjs(startTime)
				}
				reData[0] = startTime
			}
			if (isTrue(endTime)) {
				if (isString(endTime)) {
					endTime = dayjs(endTime)
				}
				reData[1] = endTime
			}
			return reData
		}

		return () => {
			const data = {
				value: getTimeData(),
			}

			return (
				<RangePicker
					v-model={[data.value, 'value']}
					onChange={onChange}
					style={{ width: '100%' }}
					valueFormat={valueFormat}
					{...{
						...context.attrs,
					}}
				/>
			)
		}
	},
})

export default markRaw(RRangePicker)
