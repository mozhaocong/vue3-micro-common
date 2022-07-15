import { ColumnGroupType, ColumnsType, ColumnType } from 'ant-design-vue/lib/table/interface'
interface formTableColumns extends ColumnType<any> {
	row?: FormRowArray
	display?: () => boolean | boolean
}
interface formTableColumnsGroup extends ColumnGroupType<any> {
	row?: FormRowArray
	display?: () => boolean | boolean
}

declare global {
	type tableColumnsType = ColumnsType
	type formTableColumnsType = (formTableColumns | formTableColumnsGroup)[]
}
