let erpUrl = 'http://erp_test.admin.htwig.com'
let apiUrl = 'http://crm_test.htwig.com'
console.log('import.meta.env.VITE_ENV', import.meta.env.VITE_ENV)
switch (import.meta?.env?.VITE_ENV) {
	case 'test':
		erpUrl = 'http://erp_test.admin.htwig.com'
		apiUrl = 'http://crm_test.htwig.com'
		break
	case 'prod':
		erpUrl = 'https://erp.admin.htwig.com'
		apiUrl = 'http://portal.admin.htwig.com:8000'
		break
}

export { apiUrl, erpUrl }
