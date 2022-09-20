import { defineComponent, PropType, ref, watch } from 'vue'
import { Button } from 'ant-design-vue'
import AddRole from './addRole'

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
			() => {
				const { roleList: recordRoleList } = props.recordData || {}
				roleList.value = recordRoleList || []
				console.log(recordRoleList)
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
