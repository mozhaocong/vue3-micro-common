import dayjs from 'dayjs'
export const rangePickerShowTime = {
	defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')],
}

export const valueFormat = 'YYYY-MM-DD HH:mm:ss'

export const defaultRowProps = {
	allowClear: true,
}
