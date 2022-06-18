import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import { axiosInit } from '@/http'
import { ISMICROCHILD, microAppInit, MICROWINDOWDATA } from '@/microAppMethod'
import { erpLoginModule } from '@/store/modules/erp/public/login'
import { isTrue } from '@/utils'
// 日期中文问题
// import 'dayjs/locale/zh-cn'

// 京东框架微前端 初始化
microAppInit({ mount })

// 初始化接口请求
axiosInit()

if (!ISMICROCHILD) {
	vueInit()
}
function mount() {
	if (!window[MICROWINDOWDATA as any]) {
		vueInit()
	}
}

function vueInit() {
	const app = createApp(App)
	app.use(store)
	app.use(Antd)
	app.use(router).mount(`#${import.meta.env.VITE_APP_ID}`)

	// 页面跳转滚动条显示问题
	router.afterEach(() => {
		console.log('router.afterEach')
		const scrollTopDom = document.querySelector('.ht_layout_content')
		if (scrollTopDom) {
			scrollTopDom.scrollTop = 0
		}
	})

	// 初始化动态路由
	erpLoginModule.appDataInit()
	if (isTrue(app)) {
		app.config.warnHandler = (msg: string) => {
			// 我就是不想打印
			if (
				[
					'Failed to resolve component: micro-app\n' +
						'If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.',
					'Extraneous non-props attributes (style) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.',
				].includes(msg)
			) {
				return
			}
			console.warn(msg)
		}
	}
}
