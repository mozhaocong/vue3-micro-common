import { computed, defineComponent, PropType, ref, watch } from 'vue'
import { Dropdown, InputSearch, Tree } from 'ant-design-vue'
import { debounce, deepClone, isTrue } from '@/utils'

interface fieldNamesType {
	children: string
	title: string
	key: string
}
const propsData = {
	treeData: {
		type: Array as PropType<ObjectMap[]>,
		required: true,
	},
	expandedKeys: {
		type: [Array, undefined] as PropType<string[]>,
		default: undefined,
	},
	searchValue: {
		type: [String] as PropType<string>,
		default: undefined,
	},
	dropdownOverlay: {
		type: Function as PropType<(item: any) => any>,
	},
	fieldNames: {
		type: Object as PropType<fieldNamesType>,
		default() {
			return { children: 'children', title: 'title', key: 'key' }
		},
	},
	searchFilter: {
		type: Function as PropType<(item: any) => boolean>,
	},
} as const

export default defineComponent({
	props: propsData,
	name: 'SearchTree',
	emits: ['select', 'update:expandedKeys', 'update:searchValue'],
	setup(props, { emit }) {
		// 默认tree数组 用来重置treeData
		let defaultTreeData: any[] = []
		// 默认expandedKeys  用来重置expandedKeys
		let defaultExpandedKeys: any[] = []
		const expandedKeys = ref<string[]>([])
		const searchValue = ref('')
		const treeData = ref<any[]>(defaultTreeData)

		const computedExpandedKeys = computed<string[]>({
			get: () => {
				return props.expandedKeys ?? expandedKeys.value
			},
			set: (value) => {
				emit('update:expandedKeys', value)
				expandedKeys.value = value
			},
		})

		const computedSearchValue = computed<string>({
			get: () => {
				return props.searchValue ?? searchValue.value
			},
			set: (value) => {
				emit('update:searchValue', value)
				searchValue.value = value
			},
		})

		watch(
			() => computedExpandedKeys.value,
			(value) => {
				if (isTrue(searchValue.value)) {
					return
				}
				defaultExpandedKeys = deepClone(value)
			}
		)

		watch(
			() => props.treeData,
			() => {
				defaultTreeData = deepClone(props.treeData)
				searchChange()
			},
			{ deep: true, immediate: true }
		)

		function searchChange() {
			const returnData: any[] = []
			function arrayData(data: any[]) {
				data.forEach((item) => {
					if (props.searchFilter) {
						if ((props.searchFilter as any)(item)) {
							returnData.push(item)
							return
						}
					} else {
						if (item[props.fieldNames.key] === searchValue.value) {
							returnData.push(item)
							return
						}
					}
					if (isTrue(item[props.fieldNames.children])) {
						arrayData(item[props.fieldNames.children])
					}
				})
			}
			if (isTrue(searchValue.value)) {
				arrayData(deepClone(props.treeData))
				treeData.value = returnData
				expandedKeys.value = []
			} else {
				treeData.value = defaultTreeData
				expandedKeys.value = defaultExpandedKeys
			}
		}

		function titleClick(selectedKeys: any, e: any) {
			const { node = {} } = e
			const { dataRef = {} } = node
			const key = dataRef[props.fieldNames.key]
			const children = dataRef[props.fieldNames.children]
			if (isTrue(selectedKeys)) {
				emit('select', dataRef)
			}
			if (!isTrue(children) || !isTrue(key)) {
				return
			}
			if (expandedKeys.value.includes(key)) {
				if (isTrue(selectedKeys)) return
				expandedKeys.value = expandedKeys.value.filter((item) => item !== key)
			} else {
				const data = deepClone(expandedKeys.value)
				data.push(key)
				expandedKeys.value = data
			}
		}
		const searchTree = debounce(searchChange, 300)
		return () => (
			<div>
				<InputSearch v-model={[computedSearchValue.value, 'value']} onChange={searchTree} placeholder="Search" />
				<Tree
					fieldNames={props.fieldNames}
					v-model={[computedExpandedKeys.value, 'expandedKeys']}
					tree-data={treeData.value}
					onSelect={titleClick}
					v-slots={{
						title: (item: any) => {
							const { title } = item
							if (!props.dropdownOverlay) {
								return <span>{title}</span>
							}
							return (
								<Dropdown
									trigger={['contextmenu']}
									v-slots={{
										overlay: () => {
											return (props.dropdownOverlay as any)(item)
										},
									}}
								>
									<span>{title}</span>
								</Dropdown>
							)
						},
					}}
				/>
			</div>
		)
	},
})
