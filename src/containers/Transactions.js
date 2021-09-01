import React from 'react';
import { CardGrid, Card, Group } from '@vkontakte/vkui';
import TransactionItem from '../components/TransactionItem'
import {transactions} from '../data'
import ROUTES from '../routes'
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
