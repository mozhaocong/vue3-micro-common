import { throttle, requestJudgment, messageError } from '@/utils'
import { loginAgain } from '@/store/modules/erp/public/utils/routerOperation'
export function resUestCode(item: ObjectMap) {
	switch (item.code) {
		case 401:
			throttleLoginAgain()
			return
	}
	if (!requestJudgment(item)) {
		messageError(item.message)
	}
}

const throttleLoginAgain = throttle(loginAgain, 1000)
