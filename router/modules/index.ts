import basis from './basis/index'
import { RouteRecordRaw } from 'vue-router'

interface routerModulesType {
	pathName: string
	router: Array<RouteRecordRaw>
}
const data: Array<routerModulesType> = [{ pathName: 'basisModules', router: [basis] }]
export default data
