import { defineComponent, ref, watch, onMounted } from 'vue'
import { Table } from 'ant-design-vue'

export default defineComponent({
	name: 'antdTest',
	setup() {
		const dataSource = [
			{ null0: 1, null1: 2, null2: 3, null3: 4, null4: 5, null5: 6, null6: 7, null7: 8, null8: 9, null9: 10 },
			{ null0: 11, null1: 12, null2: 13, null3: 14, null4: 15, null5: 16, null6: 17, null7: 18, null8: 19, null9: 20 },
			{ null0: 21, null1: 22, null2: 23, null3: 24, null4: 25, null5: 26, null6: 27, null7: 28, null8: 29, null9: 30 },
			{ null0: 31, null1: 32, null2: 33, null3: 34, null4: 35, null5: 36, null6: 37, null7: 38, null8: 39, null9: 40 },
			{ null0: 41, null1: 42, null2: 43, null3: 44, null4: 45, null5: 46, null6: 47, null7: 48, null8: 49, null9: 50 },
			{ null0: 51, null1: 52, null2: 53, null3: 54, null4: 55, null5: 56, null6: 57, null7: 58, null8: 59, null9: 60 },
			{ null0: 61, null1: 62, null2: 63, null3: 64, null4: 65, null5: 66, null6: 67, null7: 68, null8: 69, null9: 70 },
			{ null0: 71, null1: 72, null2: 73, null3: 74, null4: 75, null5: 76, null6: 77, null7: 78, null8: 79, null9: 80 },
			{ null0: 81, null1: 82, null2: 83, null3: 84, null4: 85, null5: 86, null6: 87, null7: 88, null8: 89, null9: 90 },
			{ null0: 91, null1: 92, null2: 93, null3: 94, null4: 95, null5: 96, null6: 97, null7: 98, null8: 99, null9: 100 },
			{ null0: 1, null1: 2, null2: 3, null3: 4, null4: 5, null5: 6, null6: 7, null7: 8, null8: 9, null9: 10 },
			{ null0: 11, null1: 12, null2: 13, null3: 14, null4: 15, null5: 16, null6: 17, null7: 18, null8: 19, null9: 20 },
			{ null0: 21, null1: 22, null2: 23, null3: 24, null4: 25, null5: 26, null6: 27, null7: 28, null8: 29, null9: 30 },
			{ null0: 31, null1: 32, null2: 33, null3: 34, null4: 35, null5: 36, null6: 37, null7: 38, null8: 39, null9: 40 },
			{ null0: 41, null1: 42, null2: 43, null3: 44, null4: 45, null5: 46, null6: 47, null7: 48, null8: 49, null9: 50 },
			{ null0: 51, null1: 52, null2: 53, null3: 54, null4: 55, null5: 56, null6: 57, null7: 58, null8: 59, null9: 60 },
			{ null0: 61, null1: 62, null2: 63, null3: 64, null4: 65, null5: 66, null6: 67, null7: 68, null8: 69, null9: 70 },
			{ null0: 71, null1: 72, null2: 73, null3: 74, null4: 75, null5: 76, null6: 77, null7: 78, null8: 79, null9: 80 },
			{ null0: 81, null1: 82, null2: 83, null3: 84, null4: 85, null5: 86, null6: 87, null7: 88, null8: 89, null9: 90 },
			{ null0: 91, null1: 92, null2: 93, null3: 94, null4: 95, null5: 96, null6: 97, null7: 98, null8: 99, null9: 100 },
			{ null0: 1, null1: 2, null2: 3, null3: 4, null4: 5, null5: 6, null6: 7, null7: 8, null8: 9, null9: 10 },
			{ null0: 11, null1: 12, null2: 13, null3: 14, null4: 15, null5: 16, null6: 17, null7: 18, null8: 19, null9: 20 },
			{ null0: 21, null1: 22, null2: 23, null3: 24, null4: 25, null5: 26, null6: 27, null7: 28, null8: 29, null9: 30 },
			{ null0: 31, null1: 32, null2: 33, null3: 34, null4: 35, null5: 36, null6: 37, null7: 38, null8: 39, null9: 40 },
			{ null0: 41, null1: 42, null2: 43, null3: 44, null4: 45, null5: 46, null6: 47, null7: 48, null8: 49, null9: 50 },
			{ null0: 51, null1: 52, null2: 53, null3: 54, null4: 55, null5: 56, null6: 57, null7: 58, null8: 59, null9: 60 },
			{ null0: 61, null1: 62, null2: 63, null3: 64, null4: 65, null5: 66, null6: 67, null7: 68, null8: 69, null9: 70 },
			{ null0: 71, null1: 72, null2: 73, null3: 74, null4: 75, null5: 76, null6: 77, null7: 78, null8: 79, null9: 80 },
			{ null0: 81, null1: 82, null2: 83, null3: 84, null4: 85, null5: 86, null6: 87, null7: 88, null8: 89, null9: 90 },
			{ null0: 91, null1: 92, null2: 93, null3: 94, null4: 95, null5: 96, null6: 97, null7: 98, null8: 99, null9: 100 },
		]
		class TableRow {
			data: tableColumnsType
			constructor(operationClick?: any) {
				this.data = [
					{ title: 'asna1', dataIndex: 'null1', align: 'center', width: 300 },
					{ title: 'asyhfk,', dataIndex: 'null2', align: 'center', width: 300 },
					{ title: 'euyru,', dataIndex: 'null3', align: 'center', width: 300 },
					{ title: 'kfgk', dataIndex: 'null4', align: 'center', width: 300 },
					{ title: 'reure', dataIndex: 'null5', align: 'center', width: 300 },
					{ title: 'fjfdn', dataIndex: 'null6', align: 'center', width: 300 },
					{ title: 'hgret', dataIndex: 'null7', align: 'center', width: 300 },
					{ title: 'dndm', dataIndex: 'null8', align: 'center', width: 150 },
					{ title: 'dferteyw', dataIndex: 'null9', align: 'center', width: 300 },
				]
			}
		}

		onMounted(() => {
			// 监听table是不是到低了 通过IntersectionObserver 判断 table_footer_dom是否先显示区域
			const options = {
				threshold: 1.0,
				root: document.querySelector('#' + import.meta.env.VITE_APP_ID), // 必须是目标元素的父级元素
			}
			const callback = (entries: any) => {
				entries.forEach((entry: any) => {
					show.value = !entry.isIntersecting
				})
			}
			const observer = new IntersectionObserver(callback, options)
			const target: any = document.querySelector('.table_footer_dom')
			observer.observe(target as any)

			const sticky_scrollLeft: any = document.querySelector('.sticky_scrollLeft')

			const tableDom: any = document.querySelector('.sdhnsdsdnds .ant-table-header table')
			scrollWidth.value = tableDom?.offsetWidth

			const dataTest: any = document.querySelector('.sdhnsdsdnds .ant-table-body')
			dataTest.addEventListener('scroll', (e: any) => {
				if (scrollDom === 'sticky') {
					scrollDom = ''
					return
				}
				scrollDom = 'table'
				scrollDom = sticky_scrollLeft.scrollLeft = e?.target?.scrollLeft
			})
			watch(
				() => tableRow.value,
				async (value) => {
					setTimeout(() => {
						scrollWidth.value = tableDom?.offsetWidth
					}, 0)
				},
				{ deep: true, immediate: true }
			)
		})

		const tableRow = ref(new TableRow().data)
		setTimeout(() => {
			tableRow.value.push(
				{ title: 'sgahdfh', dataIndex: 'null10', align: 'center', width: 150 },
				{ title: 'qetyvxvasd', dataIndex: 'null11', align: 'center', width: 150 },
				{ title: 'wqytqwyqy', dataIndex: 'null12', align: 'center', width: 150 }
			)
		}, 2000)

		const show = ref(false)
		const scrollWidth = ref(0)
		let scrollDom = ''
		return () => (
			<div class="nasdsaga" style="height:100vh">
				<div style="width: 100%;height:100px;flex: 0 0 auto;">antd</div>
				<div class="table_relative" style="overflow: auto;    height: calc(100vh - 100px);">
					<div style="position: relative;">
						<Table
							class="sdhnsdsdnds"
							sticky
							dataSource={dataSource}
							columns={tableRow.value}
							scroll={{ x: 1500 }}
							pagination={false}
						/>
						<div
							class="sticky_scrollLeft"
							style={{
								width: '100%',
								height: '20px',
								position: show.value ? 'sticky' : 'absolute',
								bottom: '0',
								overflow: 'auto',
							}}
							onScroll={(e: any) => {
								if (scrollDom === 'table') {
									scrollDom = ''
									return
								}
								const data: any = document.querySelector('.sdhnsdsdnds .ant-table-body')
								data.scrollLeft = e?.target?.scrollLeft
							}}
						>
							<div style={{ width: scrollWidth.value + 'px', height: '1px' }} />
						</div>
						<div class="table_footer_dom" style="width: 100%;position: absolute;  bottom: 20px;z-index: -1;" />
					</div>
				</div>
			</div>
		)
	},
})
