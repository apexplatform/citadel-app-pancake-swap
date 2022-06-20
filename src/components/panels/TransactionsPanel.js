import React, { useEffect } from 'react'
import Tabbar from '@citadeldao/apps-ui-kit/dist/components/uiKit/Tabbar'
import Header from '@citadeldao/apps-ui-kit/dist/components/uiKit/Header'
import Content from '@citadeldao/apps-ui-kit/dist/components/uiKit/Content'
import TransactionItem from "@citadeldao/apps-ui-kit/dist/components/uiKit/Transactiontem"
import Loader from '@citadeldao/apps-ui-kit/dist/components/uiKit/Loader'
import text from "../../text.json"
import { transactionActions } from '../../store/actions';
import {useDispatch,useSelector} from "react-redux";
import { Config } from '../config/config';
const TransactionsPanel = () => {
    const dispatch = useDispatch()
    const { wallets } = useSelector((state) => state.wallet)
    const transactions = useSelector((state) => state.transaction.transactions)
    const loader = useSelector((state) => state.transaction.transactionsLoaded)
    useEffect(()=>{
        dispatch(transactionActions.loadTransactions())
        // eslint-disable-next-line
    },[wallets])
    const config = new Config()
    return (
        <div className='panel'>
            <Header title='Transactions' config={config}/>
                <Content> 
                    { (loader && transactions?.length > 0) && transactions?.map((item, i) => (
                        <TransactionItem data={item} key={i}/>
                    ))}
                    { (loader && transactions?.length === 0) &&
                      <div className="no-transactions-block">
                        <img src="/img/icons/noTransactions.svg" alt="empty" />
                        <h3>{text.NO_TRANSACTIONS}</h3>
                        <p>{text.NO_TRANSACTIONS_DESCRIPTION}</p>
                      </div>
                    }  
                    {
                        !loader && <Loader />
                    }      
                </Content>
            <Tabbar config={config}/>
        </div>
    )
}

export default TransactionsPanel