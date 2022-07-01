var CreatedOKLodopObject, CLodopIsLocal, CLodopJsState

//====判断是否需要安装CLodop云打印服务器:====
export function needCLodop() {
	try {
		var ua = navigator.userAgent
		if (ua.match(/Windows\sPhone/i) != null) return true
		if (ua.match(/iPhone|iPod/i) != null) return true
		if (ua.match(/Android/i) != null) return true
		if (ua.match(/Edge\D?\d+/i) != null) return true

		var verTrident = ua.match(/Trident\D?\d+/i)
		var verIE = ua.match(/MSIE\D?\d+/i)
		var verOPR = ua.match(/OPR\D?\d+/i)
		var verFF = ua.match(/Firefox\D?\d+/i)
		var x64 = ua.match(/x64/i)
		if (verTrident == null && verIE == null && x64 !== null) return true
		else if (verFF !== null) {
			verFF = verFF[0].match(/\d+/)
			if (verFF[0] >= 42 || x64 !== null) return true
		} else if (verOPR !== null) {
			verOPR = verOPR[0].match(/\d+/)
			if (verOPR[0] >= 32) return true
		} else if (verTrident == null && verIE == null) {
			var verChrome = ua.match(/Chrome\D?\d+/i)
			if (verChrome !== null) {
				verChrome = verChrome[0].match(/\d+/)
				if (verChrome[0] >= 42) return true
			}
		}
		return false
	} catch (err) {
		return true
	}
}

//====页面引用CLodop云打印必须的JS文件：====
if (needCLodop()) {
	var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
	var JS1 = document.createElement('script')
	var JS2 = document.createElement('script')
	JS1.src = 'http://localhost:8000/CLodopfuncs.js?priority=1'
	JS2.src = 'http://localhost:18000/CLodopfuncs.js'
	JS1.onload = JS2.onload = function () {
		CLodopJsState = 'complete'
	}
	JS1.onerror = JS2.onerror = function (evt) {
		CLodopJsState = 'complete'
	}
	head.insertBefore(JS1, head.firstChild)
	head.insertBefore(JS2, head.firstChild)
	CLodopIsLocal = !!(JS1.src + JS2.src).match(/\/\/localho|\/\/127.0.0./i)
}

//====获取LODOP对象的主过程：====
export function getLodop(oOBJECT, oEMBED) {
	var LODOP
	try {
		var ua = navigator.userAgent
		var isIE = !!ua.match(/MSIE/i) || !!ua.match(/Trident/i)
		if (needCLodop()) {
			try {
				// eslint-disable-next-line no-undef
				LODOP = getCLodop()
				// eslint-disable-next-line no-empty
			} catch (err) {}
			if (!LODOP && CLodopJsState !== 'complete') {
				if (CLodopJsState == 'loading') alert('网页还没下载完毕，请稍等一下再操作.')
				else {
					alert('请先安装CLodop打印驱动,安装完成后请刷新页面')
					const a = document.createElement('a') // 创建a标签
					a.setAttribute('download', '') // download属性
					a.setAttribute('href', 'https://oss-test.htwig.com/erp/uploads/exe/CLodop_Setup_for_Win64NT_6.562EN.exe') // href链接
					a.click() // 自执行点击事件
					return
				}
				return
			}
			if (!LODOP) {
				return 'download'
			} else {
				// eslint-disable-next-line no-undef
				if (CLODOP.CVERSION < '4.1.0.1') {
					return 'download'
					// document.body.innerHTML = strCLodopUpdate + document.body.innerHTML;
				}
				if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED) //清理旧版无效元素
				if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT)
			}
		} else {
			var is64IE = isIE && !!ua.match(/x64/i)
			//==如果页面有Lodop就直接使用,否则新建:==
			if (oOBJECT || oEMBED) {
				if (isIE) LODOP = oOBJECT
				else LODOP = oEMBED
			} else if (!CreatedOKLodopObject) {
				LODOP = document.createElement('object')
				LODOP.setAttribute('width', 0)
				LODOP.setAttribute('height', 0)
				LODOP.setAttribute('style', 'position:absolute;left:0px;top:-100px;width:0px;height:0px;')
				if (isIE) LODOP.setAttribute('classid', 'clsid:2105C259-1E0C-4534-8141-A753534CB4CA')
				else LODOP.setAttribute('type', 'application/x-print-lodop')
				document.documentElement.appendChild(LODOP)
				CreatedOKLodopObject = LODOP
			} else LODOP = CreatedOKLodopObject
			//==Lodop插件未安装时提示下载地址:==
			if (!LODOP || !LODOP.VERSION) {
				if (ua.indexOf('Chrome') >= 0) return 'download'
				if (ua.indexOf('Firefox') >= 0) return 'download'
				return LODOP
			}
		}

		if (LODOP.VERSION < '6.2.2.6') {
			if (!needCLodop()) return 'download'
		}
		//===如下空白位置适合调用统一功能(如注册语句、语言选择等):==
		// LODOP.SET_LICENSES('', 'AE3D7C1122F063B4556F81828F73962527F', '', '')
		LODOP.SET_SHOW_MODE('LANGUAGE', 0)
		LODOP.SET_LICENSES('', 'AE3D7C1122F063B4556F81828F73962527F', '', '')

		//=======================================================
		return LODOP
	} catch (err) {
		alert('getLodop出错:' + err)
	}
}
