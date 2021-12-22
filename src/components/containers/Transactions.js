import { CardGrid, Card, Group , Div} from '@vkontakte/vkui';
import {useEffect} from 'react'
import TransactionItem from '../uikit/TransactionItem'
import ROUTES from '../../routes'
import {setSelectedTransaction,loadTransactions} from '../../store/actions/transactionsActions'
import {setActivePage} from '../../store/actions/panelActions'
import {connect} from 'react-redux';
import Header from '../uikit/Header'
import Loader from '../uikit/Loader'
import text from '../../text.json'

const Transactions = (props) => {
	const {transactions} = props.transactionsReducer
	const {loader} = props.panelReducer
	const setTransaction = (item) => {
		props.setActivePage(ROUTES.TRANSACTION_DETAILS)
		props.setSelectedTransaction(item)
	}
	return (
		<Group className='transactions-block'>
			<Header title="Transactions" showTitle={true}/>
			<Div className="transactions_disclaimer">
				<img src='img/icons/disclaimer.svg' alt='disclaimer'/>
				<div>
					<h4>Note</h4>
					<p>{text.TRANSACTIONS_DISCLAIMER} <span> (Fix ETA - January’22).</span></p>
				</div>
			</Div>
			{ loader ?
			<CardGrid size="l" style={{marginTop: 10}}>
			{transactions?.length ? transactions.map((item,i) => (
				<Card size="l" mode="outline" key={i} onClick={()=>setTransaction(item)}>
					<TransactionItem data={item}/>
				</Card>
			)):
			<div className='no-transactions-block'>
				<img src='img/icons/noTransactions.svg' alt='empty' />
				<h3>{text.NO_TRANSACTIONS}</h3>
				<p>{text.NO_TRANSACTIONS_DESCRIPTION}</p>
			</div>
			}
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

export default connect(mapStateToProps, {setSelectedTransaction,loadTransactions,setActivePage}) (Transactions);
