import {
	isTrue,
	isString,
	isObject,
	isArray,
	getUrlPathSearch,
	isNumber,
	isFunction,
	getSearchString,
} from './modules/tools/index'
import { messageError, messageSuccess, messageWarning } from './modules/tools/message'
import {
	deepClone,
	setArrayData,
	setArrayFilter,
	ArrayKeyToObject,
	ArrayKeyToMap,
	ObjectToArray,
	getArrayFilterData,
	ArrayObjectIncludes,
} from './modules/data'
import {
	configCurryFilter,
	configFilter,
	requestJudgment,
	asyncApiRes,
	routeToRouterTagListData,
} from '@/utils/modules/business'
import { throttle, debounce, defaultCustomRender, getToken } from './modules/tools/common'
import { jsBarcodeInit } from './modules/plugin'

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

import { mockDataSource } from './modules/mock'
export {
	isTrue,
	isString,
	deepClone,
	isObject,
	isArray,
	isNumber,
	configCurryFilter,
	configFilter,
	getUrlPathSearch,
	throttle,
	debounce,
	setArrayData,
	setArrayFilter,
	ArrayKeyToObject,
	ArrayKeyToMap,
	ObjectToArray,
	defaultCustomRender,
	requestJudgment,
	asyncApiRes,
	isFunction,
	messageError,
	messageSuccess,
	messageWarning,
	jsBarcodeInit,
	getArrayFilterData,
	routeToRouterTagListData,
	getSearchString,
	ArrayObjectIncludes,
	mockDataSource,
	getToken,
}
