export class SearchRow {
	data: FormRowArray
	constructor() {
		this.data = [
			{ title: '显示名称', key: 'title' },
			{ title: '页面路由地址', key: 'path' },
			{ title: '路由name(唯一值)', key: 'name' },
			{ title: '排序', key: 'sort' },
		]
	}
}
