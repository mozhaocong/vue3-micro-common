import { defineComponent } from 'vue'
import { Common } from '@/components'
import { roleFindAll } from '@/api/localhost/base/role'
import { Button } from 'ant-design-vue'
const { useRequest } = Common

export default defineComponent({
	name: 'basisPageRole',
	setup() {
		const { run, data } = useRequest(roleFindAll, {
			manual: true,
			onSuccess: (item) => {
				console.log('item', item)
			},
		})
		setTimeout(() => {
			console.log(data)
		}, 1000)
		return () => (
			<div>
				{data.value?.data?.map((item: any) => {
					return JSON.stringify(item)
				})}
				<Button
					onClick={() => {
						run()
					}}
				>
					刷新
				</Button>
			</div>
		)
	},
})
