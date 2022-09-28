export {
	setArrayData,
	setArrayFilter,
	serialNumber,
	dataNumberToString,
	getSearchString,
	dayJsDataToString,
	isString,
	isObject,
	isArray,
	isNumber,
	setObjetToObject,
	isFunction,
	isTrue,
	arrayObjectIncludes,
	axiosGet,
	axiosInit,
	axiosPost,
	isBlob,
	isFunctionOfOther,
	isBoolean,
	debounce,
	deepClone,
	getArrayFilterData,
	arrayObjectJudgeNullObject,
	arrayGetData,
	forArrayData,
	methodType,
	arrayKeyToMap,
	arrayKeyToObject,
	objectToArray,
	objectFilterEmpty,
	throttle,
} from 'html-mzc-tool'

export { getUrlPathSearch } from './modules/tools/index'
export { messageError, messageSuccess, messageWarning } from './modules/tools/message'
export { defaultCustomRender, getToken } from './modules/tools/common'
export { ArrayObjectIncludes, ObjectFilterNull, setTreeData } from './modules/data'
export {
	configCurryFilter,
	configFilter,
	requestJudgment,
	asyncApiRes,
	routeToRouterTagListData,
	searchDataProcessing,
	exportApiData,
} from '@/utils/modules/business'

export { jsBarcodeInit } from './modules/plugin'
export { mockDataSource } from './modules/mock'
export { requestChangeLoading } from './modules/tools/request'
export { editApiRequest } from './modules/business/index'

import { message } from 'ant-design-vue'

// 复制文字
export function copyText(text: string) {
	const textareaEl = document.createElement('textarea')
	textareaEl.setAttribute('readonly', 'readonly') // 防止手机上弹出软键盘
	textareaEl.value = text
	document.body.appendChild(textareaEl)
	textareaEl.select()
	const res = document.execCommand('copy')
	document.body.removeChild(textareaEl)
	message.success('复制成功')
	return res
}
