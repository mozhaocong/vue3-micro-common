export const hover = {
	mounted: (el: any, binding: any) => {
		el.addEventListener('mouseleave', (e: any) => {
			try {
				binding.value('mouseleave')
			} catch (e) {
				console.warn('mouseleave', e)
			}
		})
		el.addEventListener('mouseenter', (e: any) => {
			try {
				binding.value('mouseenter')
			} catch (e) {
				console.warn('mouseleave', e)
			}
		})
	},
}
