import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'basisUserManagement',
	setup() {
		const data = ref(1)
		setTimeout(() => {
			data.value = 100
		}, 1000)
		return () => <div>userManagement</div>
	},
})
