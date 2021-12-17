import { Group } from '@vkontakte/vkui';
import moment from 'moment'
import { Icon24ExternalLinkOutline } from '@vkontakte/icons';
import '../styles/panels/transactions.css'
import BigNumber from 'bignumber.js'
const TransactionDetails = ({data}) => {
   return(
	<Group className='transaction-details'>
		<div className='transasction-details-row'>
            <p className='description-text'>Send to</p>
            <span>{data.to?.value}</span>
        </div>
        <div className='transasction-details-row'>
            <p className='description-text'>Amount</p>
            <span className='transactions-status' id={+data.amount?.value?.amount < 0 ? 'red-amount-text' : undefined}>{BigNumber(data.amount?.value?.amount).toFixed()} <span className='description-text'>{data.amount?.value?.ticker}</span></span>
        </div>
        <div className='transasction-details-row'>
            <p className='description-text'>Fee</p>
            <span className='transactions-details-fee'>{data.fee?.value?.amount} <span className='description-text'>{data.fee?.value?.ticker}</span></span>
        </div>
        <div className='transasction-details-row'>
            <p className='description-text'>Status</p>
            <span className={data.status?.value == 'Success' ? 'transactions-status' : "transactions-status-failed"}>{data.status?.value}</span>
        </div>
        <div className='transasction-details-row'>
            <p className='description-text'>Time & data</p>
            <p className='description-text'>{moment().from(data.date?.value)}</p>
        </div>
        {data?.meta_info?.map((item,i) =>(
            <div className='transasction-details-row' key={i}>
                <p className='description-text'>{item?.title}</p>
                <div className='transasction-details-row'>
                    <span>{item?.value?.text || item?.value} </span>
                    {item?.value?.url ? 
                    <a href={item?.value?.url} target='_blank' style={{cursor: 'pointer'}} ><Icon24ExternalLinkOutline fill='#67A5EB' width={20} height={20}/></a>: ''}
                </div>
            </div>
        ))
        }
        {data?.comment?.value ?
        <div>
            <p className='description-text'>Comment</p>
            <p>{data?.comment?.value}</p>
        </div>: '' }
	</Group>
);
}
export default TransactionDetails;
