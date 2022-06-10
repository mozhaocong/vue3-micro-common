import RSearch from './Search/index'
import RTable from './Table/index'
import RForm from './Form'
import RFormList from './Form/components/FormList'
import RFormTable from './Form/components/FormTable'
import MinMaxInput from './MinMaxInput/index'
import MinMaxInputString from './MinMaxInputString/index'
//辅助工具类
import { useRequest } from './Search/hooks/UseRequest'
import { usePagination } from './Search/hooks/UsePagination'
import { useSearch } from './Search/hooks/UseSearch'
import { commonly } from './Search/hooks/PublicMethod'

export default {
	RSearch,
	RTable,
	RForm,
	useRequest,
	usePagination,
	useSearch,
	commonly,
	MinMaxInput,
	RFormList,
	RFormTable,
	MinMaxInputString,
}
