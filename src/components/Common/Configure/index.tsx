import { App, defineComponent, Plugin, PropType, ref, toRaw } from 'vue'
import { DragOutlined } from '@ant-design/icons-vue'
import { concat, equals, isNil, reduce } from 'ramda'
import Sortable from 'sortablejs'
interface Columns {
	title: string
	show: string
	required: string
	key: string
	label?: string
	fixed?: 'left' | 'right'
	[number: number]: any
}
function hdColumns(columns: Columns[]) {
	return reduce(
		(a: Columns[][], b) => {
			if (equals(b.fixed, 'left')) {
				a[0].push(b)
			}
			if (equals(b.fixed, 'right')) {
				a[2].push(b)
			}
			if (isNil(b.fixed)) {
				a[1].push(b)
			}
			return a
		},
		[[], [], []],
		columns
	)
}
const Rconfigure = defineComponent({
	name: 'r-configure',
	emits: ['submit', 'update:modelValue'],
	props: {
		modelValue: Boolean as PropType<boolean>,
		columns: Object as PropType<Columns[]>,
		title: String as PropType<string>,
		tableY: Number as PropType<number>,
	},
	watch: {
		columns(newdata: any) {
			this.pageColumns = hdColumns(newdata)
		},
	},
	mounted() {
		this.pageColumns = hdColumns(this.columns || [])
	},
	methods: {
		setSort() {
			// document.querySelector('.ant-spin-container')
			const el: any = this.$refs.sortable
			if (el) {
				const data = el.querySelector('.list-sortable')
				Sortable.create(data, {
					animation: 150,
					group: {
						name: 'order-ruler-sortable',
						pull: true,
						put: true,
					},
					dataIdAttr: 'data-id',
					draggable: '.ant-list-item',
					sort: true,
					scroll: true,
					handle: '.drag',
					setData(dataTransfer: any) {
						dataTransfer.setData('Text', '')
					},
					onEnd: async (evt: any) => {
						const oldIndex = evt.oldIndex || 0
						const newIndex = evt.newIndex || 0
						if (equals(evt.oldIndex, evt.newIndex)) return
						const oldData = this.pageColumns[1][oldIndex]
						this.pageColumns[1].splice(oldIndex, 1)
						this.pageColumns[1].splice(newIndex, 0, oldData)
					},
				})
			}
		},
		goInit() {
			this.pageColumns = []
			this.$emit('submit', [])
			this.$emit('update:modelValue', false)
		},
	},
	setup(props, { emit }) {
		function onClose() {
			emit('update:modelValue', false)
		}
		const pageColumns = ref<Columns[][]>([])
		const tableYInput = ref(props.tableY)
		return {
			onClose,
			pageColumns,
			tableYInput,
		}
	},
	updated() {
		if (this.modelValue) {
			setTimeout(() => {
				this.setSort()
			}, 10)
		}
	},
	render() {
		return (
			<div ref="sortable">
				{this.modelValue ? (
					<a-drawer title={this.title} placement="right" width={300} visible={true} onClose={this.onClose}>
						{isNil(this.tableYInput) ? null : (
							<div
								style={{
									borderBottom: '1px solid #f0f0f0',
									paddingBottom: '15px',
								}}
							>
								表格高度：
								<a-inputNumber v-model={[this.tableYInput, 'value']} />
							</div>
						)}
						<div id="a-drawer-a-list" ref="sortable" class="ant-list-split" style="padding-bottom:40px">
							{this.pageColumns.map((item, index) => {
								const is = equals(1, index)
								return (
									<ul class={is ? 'ant-list-items list-sortable' : 'ant-list-items'}>
										{item.map((item) => {
											return (
												<li class="ant-list-item" key={item.key} data-id={item.key}>
													<a-space>
														{is ? <DragOutlined style="color: #1890ff;font-size:14px" class="drag" /> : <span />}
														<a-checkbox v-model={[item.show, 'checked']} disabled={item.required}>
															{equals(typeof item.title, 'string') ? item.title : item.label}
														</a-checkbox>
													</a-space>
												</li>
											)
										})}
									</ul>
								)
							})}
						</div>

						<div
							style={{
								position: 'absolute',
								bottom: 0,
								width: '100%',
								borderTop: '1px solid #e8e8e8',
								padding: '10px 16px',
								textAlign: 'right',
								left: 0,
								background: '#fff',
								borderRadius: '0 0 4px 4px',
							}}
						>
							<a-button style="margin-right: 8px" onClick={this.onClose}>
								取消
							</a-button>
							<a-button
								style="margin-right: 8px;background: #ff7875;border-color: #ff7875;color:#fff"
								onClick={this.goInit}
							>
								恢复出厂
							</a-button>
							<a-button
								type="primary"
								onClick={() => {
									this.$emit(
										'submit',
										reduce(
											(a: Columns[], b) => {
												return concat(a, b)
											},
											[],
											toRaw(this.pageColumns)
										),
										toRaw(this.tableYInput)
									)
									this.$emit('update:modelValue', false)
								}}
							>
								确定
							</a-button>
						</div>
					</a-drawer>
				) : null}
			</div>
		)
	},
})
Rconfigure.install = function (app: App) {
	app.component(Rconfigure.name, Rconfigure)
	return app
}
export default Rconfigure as typeof Rconfigure & Plugin
