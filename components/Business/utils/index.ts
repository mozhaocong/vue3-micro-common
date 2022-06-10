import { isNil } from 'ramda'

export function filterOption(inputValue: string, option: FilterOption, isUppercase?: boolean) {
	if (!isUppercase) {
		if (!isNil(option.title) || !isNil(option.label)) {
			const data = option.title ?? (option.label || '')
			return data.includes(inputValue)
		} else {
			return false
		}
	} else {
		if (!isNil(option.title) || !isNil(option.label)) {
			const data = option.title ?? (option.label || '')
			return data.toUpperCase().includes(inputValue.toUpperCase())
		} else {
			return false
		}
	}
}
