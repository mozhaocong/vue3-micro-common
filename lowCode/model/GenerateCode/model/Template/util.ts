import { copyText } from '@/utils'

export function setTemplate(data: any[], templateType: string, key: string) {
	switch (key) {
		case 'columns':
			setColumns(data, templateType)
			break
		case 'dataSource':
			setDataSource(data, templateType)
			break
		case 'code':
			setCode(data, templateType)
			break
	}
}

function setCode(data: any[], templateType: string) {
	let copyTextData = ''
	switch (templateType) {
		case 'table':
			copyTextData = `<RTable dataSource={dataSource} columns={tableRow} setup={false} />`
			break
		case 'form':
			copyTextData = `<RForm fid="tableFrom" rows={fromRow} rowProps={defaultRowProps} model={model.value} finish={finish} />`
			break
	}
	copyText(copyTextData)
}

function setColumns(data: any[], templateType: string) {
	let nub = 0

	// table模板
	function setTableReturnData(data: any[]): string {
		return `export class TableRow {
		  data: tableColumnsType
      constructor(operationClick?: any) {
        this.data =[${data.join(',')}]
      }
    }`
	}
	// table模板 项数据
	function templateTableString(val: ObjectMap) {
		let objectData = ''
		switch (val.type) {
			case 'config':
				objectData = `customRender: configCurryFilter('${val.typeValue || 'null'}'),`
				break
			case 'render':
				objectData = `customRender:({ text, record }) => { return ''}`
				break
		}

		return `{ title: '${val.title}', dataIndex: 'null${nub}', align: 'center', width: 150, ${objectData} }`
	}

	// search模板
	function setSearchReturnData(data: any[]): string {
		return `export class SearchRow {
			data: FormRowArray
			constructor(searchForm: ObjectMap) {
				this.data = [${data.join(',')}]
			}
		}`
	}
	// RFrom模板
	function setFromReturnData(data: any[]): string {
		return `export class FormRow {
			data: FormRowArray
			constructor(formModel?: ObjectMap) {
				this.data = [${data.join(',')}]
			}
		}`
	}

	// RFrom模板 项数据
	function templateSearchFromString(val: ObjectMap) {
		let objectData = ''
		switch (val.type) {
			case 'config':
				objectData = `component: <FormConfig />, props: {prop: '${val.typeValue || 'null'}'}`
				break
			case 'basic':
				objectData = `component: <FormBasicData />, props: {prop: '${val.typeValue || 'null'}'}`
				break
		}

		return `{title: '${val.title}',key: 'null${nub}', ${objectData}}`
	}

	function setTemplateType({ item, data }: { item?: ObjectMap; data?: string[] }) {
		switch (templateType) {
			case 'table':
				return { template: templateTableString(item || {}), returnData: setTableReturnData(data || []) }
			case 'search':
				return { template: templateSearchFromString(item || {}), returnData: setSearchReturnData(data || []) }
			case 'form':
				return { template: templateSearchFromString(item || {}), returnData: setFromReturnData(data || []) }
		}
	}
	const returnArray = data.map((item) => {
		nub++
		return setTemplateType({ item })?.template || ''
	})

	const returnData = setTemplateType({ data: returnArray || [] })?.returnData || ''
	console.log(returnData)
	copyText(returnData)
}

function setDataSource(data: any[], templateType: string) {
	let nub = 0
	let copyTextData = ''
	for (let i = 0; i < 10; i++) {
		let returnData = ''
		data.forEach((item, index) => {
			nub++
			returnData += `null${index}:${nub},`
		})
		returnData = `{${returnData}},`
		copyTextData += returnData
	}
	copyTextData = `const dataSource=[${copyTextData}]`
	copyText(copyTextData)
	console.log(templateType)
	return
}
