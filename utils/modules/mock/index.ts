export function mockDataSource(item: any[]): any[] {
	const data = item.map((res) => {
		return { key: res.dataIndex ?? res.key }
	})
	let nub = 0
	return [...Array(10)].map(() => {
		const returnData: any = { id: nub }
		nub++
		data.forEach((item) => {
			returnData[item.key] = nub
			nub++
		})
		return returnData
	})
}
