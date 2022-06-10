declare module '*.vue' {
	import { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>
	export default component
}

type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
	[key in Key]: Value
}

declare let process
declare let require
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '*.css'
declare module '*.css'
declare module '*.less'
declare module '*.js'

// declare module 'rollup-plugin-external-globals' {
// 	import externalGlobals from 'rollup-plugin-external-globals'
// 	export default externalGlobals
// }

declare module 'rollup-plugin-external-globals'
declare module 'rollup-plugin-commonjs'
declare module 'file-saver'
declare module 'jsbarcode'
declare module 'qrcodejs2'
declare module 'qrcodejs2-fix'

interface ImportMetaEnv {
	readonly appIdName: string
	// 更多环境变量...
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
