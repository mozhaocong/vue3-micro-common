import { defineComponent, onMounted, reactive, ref } from 'vue'
import Sortable from 'sortablejs'
import { Button } from 'ant-design-vue'
import { deepClone, jsBarcodeInit } from '@/utils'
import { clone } from 'ramda'
import QRCode from 'qrcodejs2-fix'

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
