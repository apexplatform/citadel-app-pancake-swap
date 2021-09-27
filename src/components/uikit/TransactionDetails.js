import React from 'react';
import { Group } from '@vkontakte/vkui';
import moment from 'moment'
import '../styles/panels/transactions.css'
const TransactionDetails = ({data}) => {
    let comment = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea."
    return(
	<Group className='transaction-details'>
		<div className='transasction-details-row'>
            <p className='description-text'>Send to</p>
            <span>{data.to}</span>
        </div>
        <div className='transasction-details-row'>
            <p className='description-text'>Amount</p>
            <span className='transactions-status'>{data.amount} <span className='description-text'>{data.network}</span></span>
        </div>
        <div className='transasction-details-row'>
            <p className='description-text'>Fee</p>
            <span className='transactions-details-fee'>{data.fee} <span className='description-text'>{data.network}</span></span>
        </div>
        <div className='transasction-details-row'>
            <p className='description-text'>Status</p>
            <span className={data.status ? 'transactions-status' : "transactions-status-failed"}>{data.status ? 'Confirmed' : 'Failed'}</span>
        </div>
        <div className='transasction-details-row'>
            <p className='description-text'>Time & data</p>
            <p className='description-text'>{moment().from(data.date)}</p>
        </div>
        <div>
            <p className='description-text'>Comment</p>
            <p>{comment}</p>
        </div>
	</Group>
);
}
export default TransactionDetails;
