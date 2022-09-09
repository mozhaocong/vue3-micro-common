import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'
import QRCode from 'qrcodejs2-fix'

export default defineComponent({
	setup() {
		function initQRCode(data: string) {
			new QRCode(document.getElementById('qrcode'), {
				text: data, //要生成二维码的网址
				width: 256, //图像宽度
				height: 256, //图像高度
				colorDark: '#000000', //前景色
				colorLight: '#ffffff', //背景色
				margin: 0, //外边距
				// correctLevel: QRCode.CorrectLevel.L, //容错级别。属性值有：QRCode.CorrectLevel.L、QRCode.CorrectLevel.M、QRCode.CorrectLevel.Q、QRCode.CorrectLevel.H
			})
		}
		return () => (
			<>
				<div id="qrcode"></div>
				<Button
					onClick={() => {
						console.log(11111111111111111111111)
						initQRCode(
							'111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
						)
					}}
				>
					二维码
				</Button>
			</>
		)
	},
})
