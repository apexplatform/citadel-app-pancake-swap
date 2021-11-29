import React from 'react';
import { CardGrid, Card, Group } from '@vkontakte/vkui';
import TransactionItem from '../uikit/TransactionItem'
import {transactions} from '../../data'
import ROUTES from '../../routes'
import {setSelectedTransaction} from '../../store/actions/transactionsActions'
import {setActivePage} from '../../store/actions/panelActions'
import {connect} from 'react-redux';
import Header from '../uikit/Header'
const Transactions = (props) => {
	const setTransaction = (item) => {
		props.setActivePage(ROUTES.TRANSACTION_DETAILS)
		props.setSelectedTransaction(item)
	}
	return (
		<Group className='transactions-block'>
			<Header title="Transactions"/>
			<CardGrid size="l" style={{marginTop: 10}}>
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
