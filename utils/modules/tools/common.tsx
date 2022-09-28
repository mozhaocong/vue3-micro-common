// RFrom表单组件 默认customRender方法
export const defaultCustomRender = ({ text }: { text: any }) => {
	return <div>{text}</div>
}

export const getToken: any = () => {
	return localStorage.getItem('Authorization')
}
