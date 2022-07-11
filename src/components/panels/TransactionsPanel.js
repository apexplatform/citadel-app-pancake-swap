import React, { useEffect } from 'react'
import { TransactionItem, Loader, Content, Tabbar } from "@citadeldao/apps-ui-kit/dist/main"
import text from "../../text.json"
import { transactionActions, panelActions } from '../../store/actions';
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import ROUTES from "../../routes";
import { Config } from '../config/config';
const TransactionsPanel = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const config = new Config()
    const dispatch = useDispatch();
    const { wallets } = useSelector((state) => state.wallet)
    const transactions = useSelector((state) => state.transaction.transactions)
    const loader = useSelector((state) => state.transaction.transactionsLoaded)
    useEffect(()=>{
        dispatch(transactionActions.loadTransactions())
        dispatch(panelActions.setPreviousPanel(location.pathname))
        // eslint-disable-next-line
    },[wallets])
    const setOpenedTransaction = (data) => {
        dispatch(transactionActions.setOpenedTransaction(data))
        navigate(ROUTES.TRANSACTION_DETAILS + '?' + window.location.search.slice(1))
    }
    return (
        <div className='panel'>
            <Content> 
                { (loader && transactions?.length > 0) && transactions?.map((item, i) => (
                    <TransactionItem data={item} key={i} onClick={setOpenedTransaction}/>
                ))}
                { (loader && transactions?.length === 0) &&
                    <div className="no-transactions-block">
                    <img src="img/icons/noTransactions.svg" alt="empty" />
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