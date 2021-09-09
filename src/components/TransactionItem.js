import React from 'react';
import '../styles/components/transactionsItem.css';
import moment from 'moment'
import fileRoutes from '../config/file-routes-config.json'
const TransactionItem = ({data}) =>{
    let statusClass = () => {
        if(data.status){
            if(data.type === 'stake'){
                return 'transactions-amount-stake'
            }
            return 'transactions-amount-send'
        }else{
            return "transactions-amount-error"
        }
    }
    let typeImg = () => {
        if(data.status){
            return fileRoutes.ICONS_FOLDER + data.type + '.svg'
        }else{
            return fileRoutes.ICONS_FOLDER + data.type + '-error.svg'
        }
    }
    return(
    <div className='transactions-item'>
        <div className='transactions-row'>
            <img src={typeImg()} alt='type' className='transaction-type-img'/>
            <div className='transactions-column-1'>
                <div className='transactions-row'>
                    <h5 className='transaction-type-text'>{data.type}</h5>
                    {data.status ?
                    <img src={fileRoutes.SUCCESS_ICON} alt='type'/>:
                    <img src={fileRoutes.ERROR_ICON} alt='type'/>}
                </div>
                <p className='gray-text'>{moment().from(data.date)}</p>
            </div>
        </div>
        <div className='transactions-column-2'>
            <div className='transactions-row'>
                <h5 className={statusClass()+' transactions-amount'}>{data.amount}</h5>
                <p className='transactions-net'>{data.network}</p>
            </div>
            <div className='transactions-row'>
                <p className='gray-text'>Fee:</p>
                <h5 className='transactions-fee'>{data.fee}</h5>
                <p className='gray-text'>{data.network}</p>
            </div>
        </div>
    </div>
)
};

export default TransactionItem;
