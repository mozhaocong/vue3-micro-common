import { defineComponent, ref } from 'vue'
import { Button } from 'ant-design-vue'
import { jsBarcodeInit } from '@/utils'

export default defineComponent({
	setup() {
		const imgSrc = ref()
		return () => (
			<>
				<img src={imgSrc.value} />
				<Button
					onClick={() => {
						console.log(11111111111111111111111)
						jsBarcodeInit({
							data: '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
							callback: (item) => {
								console.log('item', item)
								imgSrc.value = item
							},
						})
					}}
				>
					条形码
				</Button>
			</>
		)
	},
})
