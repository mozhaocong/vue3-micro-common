type requestChangeLoadingType = {
	api: Promise<any>
	value: { value: boolean }
}
export async function requestChangeLoading(item: requestChangeLoadingType): Promise<any> {
	const { api, value } = item
	value.value = true
	const data = await api
	value.value = false
	return data
}
