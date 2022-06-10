import JsBarcode from 'jsbarcode'
import { saveAs } from 'file-saver'
import { notification } from 'ant-design-vue'

interface jsBarcodeType {
	data: string
	callback?: (item: string) => void
	isSaveAs?: boolean
}

// 生成条形码下载
export function jsBarcodeInit(item: jsBarcodeType) {
	const { data, callback, isSaveAs = false } = item
	try {
		const image = new Image()
		JsBarcode(image, data, {
			format: 'CODE128',
			width: 1.4,
			height: 40,
			fontSize: 12,
		})
		image.onload = () => {
			if (callback) {
				callback(image.src)
			}
			if (isSaveAs) {
				saveAs(image.src, data + '条形码.png')
			}
		}
		// const a = document.createElement('a') // 创建一个a节点插入的document
		// const event = new MouseEvent('click') // 模拟鼠标click点击事件
		// a.download = data + '条形码' // 设置a节点的download属性值
		// a.href = url // 将图片的src赋值给a节点的href
		// a.dispatchEvent(event)
	} catch (e) {
		console.log(e)
		notification.error({
			message: `条形码生成失败`,
			description: '',
		})
	}
}
