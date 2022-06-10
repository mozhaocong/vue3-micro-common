import { join } from 'path'
import { writeFileSync } from 'fs'
export function microViteSub() {
	return (function () {
		let basePath = ''
		return {
			name: 'vite:micro-app',
			apply: 'build',
			configResolved(config: any) {
				basePath = `${config.base}${config.build.assetsDir}/`
			},
			writeBundle(options: any, bundle: any) {
				for (const chunkName in bundle) {
					if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
						const chunk = bundle[chunkName]
						if (chunk.fileName && chunk.fileName.endsWith('.js')) {
							chunk.code = chunk.code.replace(
								/(from|import\()(\s*['"])(\.\.?\/)/g,
								(all: any, $1: any, $2: any, $3: any) => {
									return all.replace($3, new URL($3, basePath))
								}
							)
							const fullPath = join(options.dir, chunk.fileName)
							writeFileSync(fullPath, chunk.code)
						}
					}
				}
			},
		}
	})()
}
