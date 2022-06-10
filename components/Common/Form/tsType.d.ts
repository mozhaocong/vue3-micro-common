interface LabelCol {
	span?: number
	offset?: number
	style?: { width: string }
	[index: string]: any
}

type formItemProps = {
	wrapperCol?: LabelCol
	labelCol?: LabelCol
	[index: string]: any
	// [index: number]: any
}
type customRenderItem = { text?: any; record: ObjectMap; index?: number; dataSource?: ObjectMap }
interface RowConf {
	key: string | Array<string | number>
	name?: string | Array<string | number>
	title?: string
	keys?: Array<[string | Array[string | number], string]> // [['xxx', 'value'], ['xxx', 'label']]
	sort?: number
	required?: boolean
	show?: boolean
	colProps?: LabelCol
	formItemProps?: formItemProps
	modelValue?: string
	customRender?: (item: customRenderItem) => void
	rules?: ObjectMap | array[]
}

interface FormRow extends RowConf {
	render?: (item: customRenderItem) => JSX.Element
	component?: string | any
	slotName?: string
	props?: ((item: customRenderItem) => ObjectMap) | ObjectMap
	display?: ((item: customRenderItem) => boolean) | boolean
}

type FormRowArray = FormRow[]
