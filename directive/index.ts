export const hover = {
	mounted: (el: any, binding: any) => {
		el.addEventListener('mouseleave', () => {
			try {
				binding.value('mouseleave')
			} catch (e) {
				console.warn('mouseleave', e)
			}
		})
		el.addEventListener('mouseenter', () => {
			try {
				binding.value('mouseenter')
			} catch (e) {
				console.warn('mouseleave', e)
			}
		})
	},
}
