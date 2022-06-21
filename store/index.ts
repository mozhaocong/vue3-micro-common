import { createStore } from 'vuex'
import erpLayoutModule from '@/store/modules/erp/public/layout'
import erpLoginModule from '@/store/modules/erp/public/login'
export default createStore({
	modules: {
		erpLayout: erpLayoutModule,
		erpLogin: erpLoginModule,
	},
})
