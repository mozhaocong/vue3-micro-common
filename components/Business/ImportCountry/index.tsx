import { Button, message, Modal, Select, SelectOption, Upload } from 'ant-design-vue'
import { CloudUploadOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons-vue'
import { defineComponent, PropType, reactive, ref } from 'vue'
import './index.less'
const Props = {
	value: {
		type: Object as PropType<ObjectMap>,
		default: () => {
			return {}
		},
	},
} as const
export default defineComponent({
	name: 'BadReasonsBase',
	props: Props,
	emits: ['update'],
	setup(prop, { emit, attrs }) {
		function onCancel() {
			prop.value.showImport = false
		}

		// 导入监听
		function handleChange(val: any) {
			prop.value
				.api({
					file: val.file,
				})
				.then((res: any) => {
					if (res !== '') {
						prop.value.showImport = false
						emit('update', true)
						console.log(res)
					}
				})
		}

		return () => (
			<>
				<Modal title={prop.value.title} width={600} visible={prop.value.showImport} onCancel={onCancel}>
					<p>在导入资料时，如表格不规范,可能会导致导入失败，请用下载的导入表格模板进行导入</p>
					<a style="font-size: 16px; color: #6fb4f8" href={prop.value.url}>
						下载模板 <VerticalAlignBottomOutlined />
					</a>
					<hr style="width: 100%; height: 1px; border: none; background: #eee; margin: 30px 0" />
					<div style="padding-bottom: 18px; text-align: center; margin-top: 10px">
						<Upload name="file" action="" accept="xlsx,csv" multiple onChange={handleChange}>
							<div class="importClass">
								<CloudUploadOutlined class="uploadIcon" />
								<div class="el-upload__text">
									将文件拖到此处，或<em class="upload_em">点击上传</em>
								</div>
							</div>
						</Upload>
					</div>
				</Modal>
			</>
		)
	},
})
