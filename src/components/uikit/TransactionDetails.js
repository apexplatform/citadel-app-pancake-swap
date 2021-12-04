import { Group } from '@vkontakte/vkui';
import moment from 'moment'
import '../styles/panels/transactions.css'
const TransactionDetails = ({data}) => {
    return(
	<Group className='transaction-details'>
		<div className='transasction-details-row'>
            <p className='description-text'>Send to</p>
            <span>{data.to?.value}</span>
        </div>
        <div className='transasction-details-row'>
            <p className='description-text'>Amount</p>
            <span className='transactions-status'>{data.amount?.value?.amount} <span className='description-text'>{data.amount?.value?.ticker}</span></span>
        </div>
        <div className='transasction-details-row'>
            <p className='description-text'>Fee</p>
            <span className='transactions-details-fee'>{data.fee?.value?.amount} <span className='description-text'>{data.fee?.value?.ticker}</span></span>
        </div>
        <div className='transasction-details-row'>
            <p className='description-text'>Status</p>
            <span className={data.status.value ? 'transactions-status' : "transactions-status-failed"}>{data.status.value ? 'Confirmed' : 'Failed'}</span>
        </div>
        <div className='transasction-details-row'>
            <p className='description-text'>Time & data</p>
            <p className='description-text'>{moment().from(data.date?.value)}</p>
        </div>
        {data?.comment?.value ?
        <div>
            <p className='description-text'>Comment</p>
            <p>{data?.comment?.value}</p>
        </div>: '' }
	</Group>
);
}
export default TransactionDetails;
