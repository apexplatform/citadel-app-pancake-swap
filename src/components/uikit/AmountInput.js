import { useState,useEffect } from 'react'
import '../styles/components/amountInput.css'
import text from '../../text.json'
import fileRoutes from '../../config/file-routes-config.json'
import {connect} from 'react-redux'
import BigNumber from 'bignumber.js';
import Updater from '../../networking/utils/updater'
import {setRateAmount,updateTradeInfo, setSwapStatus,checkTokenAllowance,checkAmount,setTimerApprove} from '../../store/actions/swapActions'
import {setToAmount,setAmount}  from '../../store/actions/walletActions'

const AmountInput = (props) => {
    const [hasError, setError] = useState(false)
    const [currencyOffset,setCurrencyOffset] = [props.amount?.toString().length * 9 + 5 || 30]
    const {currentWallet,fromToken,toToken,amount} = props.walletReducer
    const {allowanceAmount,timerApprove} = props.swapReducer
    const showMax = props.hideMax || false
    const showFee = props.hideFee || false
    const coin = currentWallet?.network.toUpperCase()
    const feeProcent = +props.fee || 0.001
    const getBalance = () => {
        if(fromToken.symbol === 'BNB') return currentWallet?.balance?.mainBalance
        if(props.name === 'INPUT' && fromToken.balance) return fromToken.balance
        if(props.name === 'OUTPUT' && toToken.balance) return toToken.balance
        else return 0
    }
    // const checkAmount = (val,name) => {
    //     props.setAmount(val)
    //     props.setField(props.name)
    //    // props.setExactIn(props.name === 'INPUT' ? true : false)
    //     if(+val > 0){
    //         props.updateTradeInfo(val, props.name === 'INPUT' ? true : false)
    //         props.setToAmount(outputAmount)
    //         if(parseInt(val) > balance){
    //             props.setSwapStatus('insufficientBalance')
    //         }
    //         else if(parseInt(val) < +balance - feeProcent){
    //             if(BigNumber(allowanceAmount).div(BigNumber(Math.pow(10,+fromToken.decimals))) > parseInt(val) || fromToken.symbol === 'BNB'){
    //                 if(parseFloat(props.slippage?.toFixed(2)||0) < +slippageTolerance){
    //                     props.setSwapStatus('swap')
    //                 }else{
    //                     props.setSwapStatus('swapAnyway')
    //                 }
    //             } else {
    //                 setIsactive(true)
    //                 props.setSwapStatus('approve')
    //             }
    //         } else {
    //             props.setSwapStatus('feeError')
    //         }
    //     } else {
    //         props.setSwapStatus('enterAmount')
    //     }
    // }
    const setMaxAmount = () => {
        const balance = getBalance()
        console.log(balance,feeProcent,fromToken,'--balance-feeProcent')
        if(+balance-feeProcent < 0 || +balance<=0){
            props.setAmount(0)
         
            props.setSwapStatus('insufficientBalance')
        }else{
            // console.log(+balance-feeProcent,'----')
            // props.setExactIn(props.name === 'INPUT' ? true : false)
            // props.updateTradeInfo(+balance-feeProcent, props.isExactIn)
            props.checkAmount(+balance-feeProcent,props.name)
        }
    }
    useEffect(() => {
        let interval = null;
        if (timerApprove) {
          interval = setInterval(() => {
            props.checkTokenAllowance()
            if(BigNumber(allowanceAmount).div(BigNumber(Math.pow(10,+fromToken.decimals))).toNumber() > parseInt(amount)){
                props.setSwapStatus('swap')
                props.setTimerApprove(false)
            }
          }, 5000);
        } else if (!timerApprove) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [timerApprove,allowanceAmount]);
    
    return(
        <div className='amount-container'>
            <div className='input-container' >
                <input className={hasError ? 'error-input' : undefined} type='number' value={props.amount} onChange={(e) => props.checkAmount(e.target.value,props.name)}/>
                <span className='input-currency' style={{ left: `${currencyOffset}px` }}>{props.name === 'INPUT' ? fromToken.symbol : toToken.symbol}</span>
                {showMax && <button className='max-btn' onClick={() => setMaxAmount()}>Max</button>}
            </div>
         
            {!showFee &&
            <div className='fee-container'>
				<h5>{text.FEE_TEXT}</h5>
				<span className='fee-amount'>{feeProcent} </span>
				<h5>{coin}</h5>
			</div>}
            {hasError &&
            <div className='fee-container'>
                <img src={fileRoutes.ERROR_ICON} alt='error'/>
                <span className='amount-error-text'>{text.ERRORS.INSUFFICIENT_FUNDS}</span>
            </div>}
            <Updater/>
        </div>
    )
}

const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer,
    swapReducer: state.swapReducer
})

export default connect(mapStateToProps, {setTimerApprove,checkTokenAllowance,checkAmount,setSwapStatus,setAmount,updateTradeInfo,setRateAmount,setToAmount}) (AmountInput);
