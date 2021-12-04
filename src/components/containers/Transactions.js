import { CardGrid, Card, Group } from '@vkontakte/vkui';
import {useEffect} from 'react'
import TransactionItem from '../uikit/TransactionItem'
import ROUTES from '../../routes'
import {setSelectedTransaction,loadTransactions} from '../../store/actions/transactionsActions'
import {setActivePage} from '../../store/actions/panelActions'
import {connect} from 'react-redux';
import Header from '../uikit/Header'
import Loader from '../uikit/Loader'
import {setLoader} from '../../store/actions/panelActions'
const Transactions = (props) => {
	const {transactions} = props.transactionsReducer
	const {loader} = props.panelReducer
	const setTransaction = (item) => {
		props.setActivePage(ROUTES.TRANSACTION_DETAILS)
		props.setSelectedTransaction(item)
	}
	useEffect(() => {
		props.setLoader(true)
		props.loadTransactions()
	}, [])
	return (
		<Group className='transactions-block'>
			<Header title="Transactions" showTitle={true}/>
			{ !loader ?
			<CardGrid size="l" style={{marginTop: 10}}>
			{transactions?.map((item,i) => (
				<Card size="l" mode="outline" key={i} onClick={()=>setTransaction(item)}>
					<TransactionItem data={item}/>
				</Card>
			))}
			</CardGrid>:
            <Loader id='centered-loader'/>
			}
		</Group>
	)
}

const mapStateToProps=(state)=>({
	panelReducer: state.panelReducer,
	transactionsReducer: state.transactionsReducer
})

export default connect(mapStateToProps, {setLoader,setSelectedTransaction,loadTransactions,setActivePage}) (Transactions);
