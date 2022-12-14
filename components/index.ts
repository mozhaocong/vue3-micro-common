import { App } from 'vue'
import PassWordInput from './PassWordInput/index'
import Common from './Common'
import FormConfig from './Business/FormConfig'
import FormBasicData from '@/components/Business/BasicData'
import FormRadioGroup from '@/components/Business/RadioGroup'
import ComponentPageCache from '@/components/Business/ComponentPageCache'
import KeepAliveView from './KeepAliveView/index.vue'
import RRangePicker from './Common/RangePicker'
import ComponentsUtil from '@/components/Business/ComponentsUtil'
import SimpleSearchTable from '@/components/Common/SimpleSearchTable'

const { RSearch, RForm, RTable, MinMaxInput, MinMaxInputString, RFormList, RFormTable } = Common

export {
	PassWordInput,
	RSearch,
	RForm,
	RTable,
	Common,
	FormConfig,
	FormBasicData,
	FormRadioGroup,
	KeepAliveView,
	RRangePicker,
	MinMaxInput,
	RFormList,
	RFormTable,
	MinMaxInputString,
	ComponentPageCache,
	ComponentsUtil,
	SimpleSearchTable,
}

const components = [PassWordInput, RSearch, RForm, RTable, FormBasicData, FormConfig, FormRadioGroup, MinMaxInput]

function install(app: App) {
	components.forEach(function (component) {
		app.use(component)
	})
	return app
}
export default {
	install: install,
}
