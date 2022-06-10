import { defineComponent, ref } from 'vue'
import { RForm, PassWordInput } from '@/components'

import { Button } from 'ant-design-vue'
import { erpLoginModule } from '@/store/modules/erp/public/login'

export default defineComponent({
	name: 'login',
	setup() {
		const data = ref<ObjectMap>({})
		const rows: FormRowArray = [
			{
				title: '账号',
				key: 'name',
				rules: [{ required: true, message: '账号不能为空', trigger: 'change' }],
				props: {
					style: {
						height: '40px',
					},
				},
			},
			{
				title: '密码',
				key: 'password',
				rules: [{ required: true, message: '密码不能为空', trigger: 'change' }],
				component: PassWordInput,
				props: {
					style: {
						height: '40px',
					},
				},
			},
		]

		async function toLogin() {
			const { name, password } = data.value
			const res = await erpLoginModule.onLogin({ name, password })
			console.log(res)
		}

		return () => (
			<div style="display: flex;align-items: center;width:400px;margin:0 auto;height:100vh;">
				<div>
					<RForm
						layout="vertical"
						fid="login"
						rows={rows}
						model={data.value}
						colSpan={24}
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						finish={toLogin}
					/>
					<Button
						style="display:block;width:100%;line-height:40px;height:48px;border-radius:10px;font-size:16px;"
						type="primary"
						htmlType="submit"
						{...{ form: 'login' }}
					>
						登录
					</Button>
				</div>
			</div>
		)
	},
})
