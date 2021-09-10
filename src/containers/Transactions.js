import React from 'react';
import { CardGrid, Card, Group } from '@vkontakte/vkui';
import TransactionItem from '../components/TransactionItem'
import {transactions} from '../data'
import ROUTES from '../routes'
<<<<<<< HEAD
const Transactions = (props) => (
	<Group>
		<CardGrid size="l">
		{transactions.map(item => (
			<Card size="l" mode="outline" key={item.id} onClick={()=>props.setTransaction(ROUTES.TRANSACTION_DETAILS,item)}>
				<TransactionItem data={item}/>
			</Card>
		))}
		</CardGrid>
	</Group>
);

export default Transactions;
=======
import {setSelectedTransaction} from '../store/actions/transactionsActions'
import {setActivePage} from '../store/actions/panelActions'
import {connect} from 'react-redux';
import Header from '../components/Header'
const Transactions = (props) => {
	const setTransaction = (item) => {
		props.setActivePage(ROUTES.TRANSACTION_DETAILS)
		props.setSelectedTransaction(item)
	}
	return (
		<Group className='transactions-block'>
			<Header title="Transactions"/>
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
>>>>>>> 1aa0407d9450cbeee20ca0c5409398a6a57e8154
