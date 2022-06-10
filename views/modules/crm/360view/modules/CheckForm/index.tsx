import { defineComponent, PropType } from 'vue'
import { Modal, TabPane, Tabs } from 'ant-design-vue'
import UserInfo from './modules/UserInfo'
import Refund from './modules/Refund'
import Order from './modules/Order'
import CustomerService from './modules/CustomerService'
const Props = {
	value: {
		type: Boolean as PropType<boolean>,
	},
}
export default defineComponent({
	props: Props,
	emits: ['update:value'],
	setup(porp, { emit, attrs }) {
		function finish() {
			emit('update:value', false)
		}

		const tabsList = [
			{ title: '用户信息', key: 'UserInfo', components: <UserInfo {...attrs} /> },
			{ title: '订单', key: 'Order', components: <Order {...attrs} /> },
			// { title: '客服服务', key: 'CustomerService', components: <CustomerService {...attrs} /> },
			{ title: '退款', key: 'Refund', components: <Refund {...attrs} /> },
		]

		return () => (
			<Modal title="表单Form" width={1600} visible={true} onCancel={finish} onOk={finish}>
				<Tabs defaultActiveKey="UserInfo">
					{tabsList.map((item) => {
						return (
							<TabPane tab={item.title} key={item.key}>
								{item.components}
							</TabPane>
						)
					})}
				</Tabs>
			</Modal>
		)
	},
})
