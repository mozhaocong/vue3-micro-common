import { ref } from 'vue'
/**
 * 表单查询的通用参数
 * @param arg
 * @param expan
 * @returns
 */
export function useSearch<T>(arg: T, expan = false) {
	const searchForm = ref(arg)
	const expand = ref<boolean>(expan)
	function expandToggle() {
		expand.value = !expand.value
	}
	return {
		searchForm,
		expand,
		expandToggle,
	}
}
