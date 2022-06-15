import { RFormList } from '@/components'

export class FormRow {
	data: FormRowArray
	constructor() {
		this.data = [
			{ title: '显示名称', key: 'title' },
			{ title: '页面路由地址', key: 'path' },
			{ title: '路由name(唯一值)', key: 'name' },
			{ title: '排序', key: 'sort' },
			{
				key: 'buttonPermissions',
				colProps: {
					span: 24,
				},
				render: ({ dataSource }) => {
					return (
						<RFormList
							model={dataSource?.buttonPermissions}
							rowKey={['buttonPermissions']}
							list={[
								{ key: 'name', title: '名称' },
								{ key: 'key', title: 'key' },
							]}
						/>
					)
				},
			},
		]
	}
}
