import { ref } from 'vue'
import { Button, InputNumber, Pagination, Select } from 'ant-design-vue'
import { ParamsPaginationKey } from '@/components/Common/Search/hooks/UseRequest'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { isObject } from '@/utils'

export enum PageType {
	new,
}
// export interface getPaginationDto {
// 	current: number
// 	size: number
// }
export interface Pagination {
	showTotal?: (total: number) => string
	pageSizeOptions?: Array<string>
	showQuickJumper?: boolean
	showSizeChanger?: boolean
}

export interface DefaultConfig extends Pagination {
	pageSize?: number
}

/**
 * 集成分页
 * @param search
 // * @param defaultConfig
 * @param paramsPaginationKey
 * @returns
 */
export function usePagination(
	search: (type?: PageType) => void,
	paramsPaginationKey: ParamsPaginationKey
	// defaultConfig?: DefaultConfig
) {
	const total = ref(0)
	const pageSize = ref(10)
	const current = ref(0)
	function getPagination(is = false): ObjectMap {
		if (is) {
			current.value = 1
		}
		return {
			[paramsPaginationKey.current]: current.value,
			[paramsPaginationKey.size]: pageSize.value,
		}
	}
	function handleSizeChange(index: number, size: number) {
		current.value = 1
		pageSize.value = size
		search()
	}
	function handleCurrentChange(index: number, size: number) {
		current.value = index
		pageSize.value = size
		search(PageType.new)
	}

	const jumpPage = ref(undefined)

	function onPressEnter() {
		handleCurrentChange(jumpPage.value as any, pageSize.value)
		jumpPage.value = undefined
	}
	const pageSizeOptions = [10, 20, 40, 50, 100, 200]
	const options = pageSizeOptions.map((item) => {
		return { value: item, label: `${item} 条/页` }
	})

	function renderPagination(props: { is_simple: boolean } | undefined = undefined) {
		//默认简化查询
		let is_simple = false
		if (isObject(props)) {
			is_simple = props.is_simple ?? true
		}
		return (
			<>
				{!is_simple ? (
					<div class="list_pagination">
						<Pagination
							show-less-items
							size="small"
							current={current.value}
							total={total.value}
							showTotal={(total: number) => `共 ${total} 条`}
							onShowSizeChange={handleSizeChange}
							onChange={handleCurrentChange}
							pageSizeOptions={['10', '20', '40', '50', '100', '200']}
							show-size-changer
							showQuickJumper={total.value / pageSize.value > 5}
							pageSize={pageSize.value}
						/>
						{/*<div style="width: 100%;height: 20px" />*/}
					</div>
				) : (
					<div class="list_pagination" style="display: flex;justify-content: flex-end;align-items: center;">
						<div>
							<Button
								size="small"
								type="link"
								shape="circle"
								disabled={current.value == 1}
								onClick={() => {
									handleCurrentChange(current.value - 1, pageSize.value)
								}}
								v-slots={{ icon: () => <LeftOutlined /> }}
							/>
							{current.value}
							<Button
								size="small"
								type="link"
								shape="circle"
								onClick={() => {
									handleCurrentChange(current.value + 1, pageSize.value)
								}}
								v-slots={{ icon: () => <RightOutlined /> }}
							/>
						</div>
						<Select
							style="width: 100px; margin: 0 6px;"
							size="small"
							options={options}
							v-model={[pageSize.value, 'value']}
							onChange={(e: any) => {
								handleCurrentChange(current.value, e)
							}}
						/>
						<div>
							跳至
							<InputNumber
								controls={false}
								min={1}
								precision={0}
								style="width: 50px; margin: 0 6px;"
								size="small"
								v-model={[jumpPage.value, 'value']}
								onPressEnter={onPressEnter}
							/>
							页
						</div>
					</div>
				)}
			</>
		)
	}
	return {
		total,
		pageSize,
		current,
		renderPagination,
		getPagination,
	}
}
