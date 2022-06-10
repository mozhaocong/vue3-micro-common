interface LabelCol {
	span?: number
	offset?: number
	style?: { width: string }
}
interface SearchRowConf {
	key: string
	title: string
	sort?: number
	required?: boolean
	show?: boolean
	colProps?: ObjectMap
	wrapperCol?: LabelCol
	modelValue?: string
}
interface SearchRow extends SearchRowConf {
	render?: () => JSX.Element
	component?: any
	slotName?: string
	props?: ObjectMap | (() => ObjectMap)
	commonly?: { type: string; value: string | ObjectMap | any[][] }
}
type SearchRowArray = SearchRow[]
