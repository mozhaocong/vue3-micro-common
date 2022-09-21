import { defineComponent, PropType, ref, watch } from 'vue'
import { Button } from 'ant-design-vue'
import AddRole from './addRole'
import { isTrue, requestJudgment } from '@/utils'
import { roleFindParams } from '@/api/localhost/base/role'

const Props = {
	recordData: { type: Object as PropType<ObjectMap>, required: true },
} as const

export default defineComponent({
	name: 'basisPageGroup',
	props: Props,
	setup(props) {
		const roleList = ref<any[]>([])
		const showAddRole = ref(false)
		watch(
			() => props.recordData,
			async () => {
				const { id } = props.recordData || {}
				roleList.value = []
				if (!isTrue(id)) {
					return
				}
				const res = await roleFindParams({ groupId: id })
				if (!requestJudgment(res)) return
				const {
					data: { list },
				} = res
				roleList.value = list
			},
			{
				immediate: true,
				deep: true,
			}
		)
		function addRoleClick() {
			showAddRole.value = true
		}
		return () => (
			<div>
				<div>
					<Button onClick={addRoleClick}>添加角色</Button>
				</div>
				<a-divider />
				{roleList.value.map((item) => {
					return <Button>{item.roleName}</Button>
				})}

				{showAddRole.value && <AddRole v-model={[showAddRole.value, 'visible']} recordData={props.recordData} />}
			</div>
		)
	},
})
