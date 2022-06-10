import { ColumnGroupType, ColumnsType, ColumnType } from 'ant-design-vue/lib/table/interface'
interface formTableColumns extends ColumnType<any> {
	row?: FormRowArray
}
interface formTableColumnsGroup extends ColumnGroupType<any> {
	row?: FormRowArray
}

declare global {
	type tableColumnsType = ColumnsType
	type formTableColumnsType = (formTableColumns | formTableColumnsGroup)[]
}
