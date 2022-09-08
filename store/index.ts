import { createStore } from 'vuex'
import erpLayoutModule from '@/store/modules/erp/public/layout'
import erpLoginModule from '@/store/modules/erp/public/login'
import basicDataModule from '@/store/modules/erp/business/index'
import shippingDataModule from '@/store/modules/erp/business/shipping'

const modules = {
	erpLayout: erpLayoutModule,
	erpLogin: erpLoginModule,
	basicData: basicDataModule,
	shippingData: shippingDataModule,
}

export default createStore({
	modules,
})

type vuexModulesType = typeof modules

type test = keyof vuexModulesType

type getCommitName<T> = T extends { mutations: infer G } ? G : never
type testData = {
	[K in keyof vuexModulesType]: getCommitName<vuexModulesType[K]>
}

type storeType = {
	getters?: ObjectMap
	commit?: ObjectMap
	dispatch?: ObjectMap
}

const store: storeType = {}
