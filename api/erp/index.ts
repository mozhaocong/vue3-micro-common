let erpUrl = 'http://erp_test.admin.htwig.com'
let apiUrl = 'http://crm_test.htwig.com'
switch (import.meta?.env?.VITE_ENV) {
	case 'test':
		erpUrl = 'http://erp_test.admin.htwig.com'
		apiUrl = 'http://crm_test.htwig.com'
		break
	case 'prod':
		erpUrl = 'https://erp.admin.htwig.com'
		apiUrl = 'https://portal.admin.htwig.com'
		break
}

export { apiUrl, erpUrl }
