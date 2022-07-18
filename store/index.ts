import { createStore } from 'vuex'
import erpLayoutModule from '@/store/modules/erp/public/layout'
import erpLoginModule from '@/store/modules/erp/public/login'
import basicDataModule from '@/store/modules/erp/business/index'
import shippingDataModule from '@/store/modules/erp/business/shipping'
export default createStore({
	modules: {
		erpLayout: erpLayoutModule,
		erpLogin: erpLoginModule,
		basicData: basicDataModule,
		shippingData: shippingDataModule,
	},
})
