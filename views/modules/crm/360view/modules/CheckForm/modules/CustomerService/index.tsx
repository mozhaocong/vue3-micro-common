import { defineComponent } from 'vue'
import { RTable } from '@/components'
import { TableRow } from './util'
export default defineComponent({
	setup() {
		const dataSource = [
			{ null0: 1, null1: 2, null2: 3, null3: 4, null4: 5 },
			{ null0: 6, null1: 7, null2: 8, null3: 9, null4: 10 },
			{ null0: 11, null1: 12, null2: 13, null3: 14, null4: 15 },
			{ null0: 16, null1: 17, null2: 18, null3: 19, null4: 20 },
			{ null0: 21, null1: 22, null2: 23, null3: 24, null4: 25 },
			{ null0: 26, null1: 27, null2: 28, null3: 29, null4: 30 },
			{ null0: 31, null1: 32, null2: 33, null3: 34, null4: 35 },
			{ null0: 36, null1: 37, null2: 38, null3: 39, null4: 40 },
			{ null0: 41, null1: 42, null2: 43, null3: 44, null4: 45 },
			{ null0: 46, null1: 47, null2: 48, null3: 49, null4: 50 },
		]
		const tableRow = new TableRow().data
		return () => (
			<div>
				<RTable dataSource={dataSource} columns={tableRow} setup={false} sticky={false} />
			</div>
		)
	},
})
