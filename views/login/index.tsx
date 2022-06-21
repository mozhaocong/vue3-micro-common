import { defineComponent, ref } from 'vue'
import { RForm, PassWordInput } from '@/components'
import { Button, Input } from 'ant-design-vue'
import iconImg from '../../assets/image/title.png'
import titleImg from '../../assets/image/contentValue.png'
import account from '../../assets/image/account.png'
import './login.less'
import { useStore } from 'vuex'

export default defineComponent({
	name: 'login',
	setup() {
		const data = ref<ObjectMap>({})
		const { dispatch } = useStore()
		const rows: FormRowArray = [
			{
				title: '',
				key: 'name',
				rules: [{ required: true, message: '账号不能为空', trigger: 'change' }],
				customRender: ({ record }) => {
					console.log(record)
					return (
						<Input
							v-model={[record.name, 'value']}
							v-slots={{
								prefix: () => {
									return <img class="imageIcon" src={account}></img>
								},
							}}
						/>
					)
				},
				props: {
					style: {
						height: '40px',
					},
				},
			},
			{
				title: '',
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
			const res = await dispatch('erpLogin/onLogin', { name, password })
			console.log(res)
		}

		return () => (
			<div class="login">
				<img src={iconImg} class="iconImg" alt="" />
				<img src={titleImg} class="titleImg" alt="" />
				<div class="content">
					<div class="pack">
						<div class="titleTop">
							<div>欢迎登录</div>
							<span class="decorate"></span>
						</div>
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
						<Button class="ButtonBottom" type="primary" htmlType="submit" {...{ form: 'login' }}>
							登录
						</Button>
					</div>
				</div>
			</div>
		)
	},
})
