import { PropType } from 'vue'
import { clone } from 'ramda'
import { isArray, isString, isTrue } from '@/utils'

export const formProps = {
	labelCol: {
		type: Object as PropType<LabelCol>,
		default: () => {
			return { span: 6 }
		},
	},
	wrapperCol: {
		type: Object as PropType<LabelCol>,
		default: () => {
			return { span: 16 }
		},
	},

	fid: { type: String as PropType<string>, default: 'formFid' },
	rowProps: {
		type: Object as PropType<ObjectMap>,
		default() {
			return {}
		},
	},
	customRender: Function as PropType<(item: { text: any; record: ObjectMap }) => void>,
	component: null,
	disabled: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	labelAlign: {
		type: String as PropType<'left' | 'right'>,
		default: 'right',
	},
	colon: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	colSpan: [Number, String] as PropType<number | ''>,
	finish: Function as PropType<(item?: any) => void>,
	finishFailed: Function as PropType<(item?: any) => void>,
	rules: {
		type: Object as PropType<ObjectMap>,
		default: () => {
			return {}
		},
	},
	formRef: {
		type: null,
		default: null,
	},
	layout: {
		type: String as PropType<'horizontal' | 'vertical' | 'inline'>,
		default: 'horizontal',
	},
	formItemStyle: Object as PropType<ObjectMap>,
}

export function setFormConfig(props: ObjectMap): ObjectMap {
	return {
		layout: props.layout,
		id: props.fid,
		model: props.model,
		rules: props.rules,
		labelCol: props.labelCol,
		wrapperCol: props.wrapperCol,
		colon: props.colon,
		labelAlign: props.labelAlign,

		onFinish: () => {
			if (props.finish) {
				props.finish(clone(props.model))
			}
		},
		onFinishFailed: props.finishFailed,
	}
}

export function formRulesName(props: ObjectMap, res: ObjectMap, index: number) {
	let nameKey: any[] = [index]
	if (isTrue(props.rowKey)) {
		nameKey = [...(props.rowKey as string[]), ...nameKey]
	}
	if (isArray(res.key)) {
		nameKey = [...nameKey, ...res.key]
	} else if (isString(res.key)) {
		nameKey = [...nameKey, res.key]
	}
	return nameKey
}

export function formItemConfig(props: ObjectMap): ObjectMap {
	return {
		formItemStyle: props.formItemStyle,
		rowProps: props.rowProps,
		customRender: props.customRender,
		component: props.component,
		disabled: props.disabled,
		colSpan: props.colSpan,
	}
}
