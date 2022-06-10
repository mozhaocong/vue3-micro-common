import { defineComponent, onMounted, reactive, ref } from 'vue'
import Sortable from 'sortablejs'
import { Button } from 'ant-design-vue'
import { deepClone } from '@/utils'
import { clone } from 'ramda'

export default defineComponent({
	setup() {
		let nub = 11
		const isInit = ref(true)
		const listData = ref<any[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
		let sortable: any = null
		function deleteItem(index: number) {
			listData.value.splice(index, 1)
		}
		function sortableInit() {
			const el: any = document.querySelector('.gshsdh')
			const ops = {
				animation: 200,
				group: 'name',
				scroll: false,
				//拖动结束
				onEnd: function () {
					const sortableList: any[] = sortable.toArray()
					const data = sortableList.map((res) => {
						for (const item of listData.value) {
							if (item + '' === res + '') {
								return item
							}
						}
					})
					listData.value = clone(data)
				},
			}
			sortable = Sortable.create(el, ops)
		}
		onMounted(() => {
			sortableInit()
		})
		return () => (
			<>
				{isInit.value && (
					<div class="gshsdh" style="border: 1px solid; display: flex; width: 365px;flex-wrap: wrap;">
						{listData.value.map((item: any, index) => {
							return (
								<div
									onClick={() => {
										deleteItem(index)
									}}
									key={item}
									data-id={item}
									style="width: 100px;height: 100px;margin: 10px; border: 1px solid;"
								>
									{item}
								</div>
							)
						})}
					</div>
				)}

				<Button
					onClick={() => {
						nub++
						listData.value.push(nub)
					}}
				>
					添加
				</Button>
			</>
		)
	},
})
