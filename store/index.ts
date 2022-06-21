import { createStore } from 'vuex'
import erpLayoutModule from '@/store/modules/erp/public/layout'
export default createStore({
	modules: {
		erpLayout: erpLayoutModule,
	},
})
