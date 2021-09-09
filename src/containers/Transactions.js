import React from 'react';
import { CardGrid, Card, Group } from '@vkontakte/vkui';
import TransactionItem from '../components/TransactionItem'
import {transactions} from '../data'
import ROUTES from '../routes'
import {setSelectedTransaction} from '../store/actions/transactionsActions'
import {setActivePage} from '../store/actions/panelActions'
import {connect} from 'react-redux';

const Transactions = (props) => {
	const setTransaction = (item) => {
		props.setActivePage(ROUTES.TRANSACTION_DETAILS)
		props.setSelectedTransaction(item)
	}
	return (
		<Group className='transactions-block'>
			<CardGrid size="l">
			{transactions.map(item => (
				<Card size="l" mode="outline" key={item.id} onClick={()=>setTransaction(item)}>
					<TransactionItem data={item}/>
				</Card>
			))}
			</CardGrid>
		</Group>
	)
}

const mapStateToProps=(state)=>({
	panelReducer: state.panelReducer
})

export default connect(mapStateToProps, {setSelectedTransaction,setActivePage}) (Transactions);
