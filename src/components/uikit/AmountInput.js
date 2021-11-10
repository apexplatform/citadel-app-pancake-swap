import { useState,useEffect } from 'react'
import '../styles/components/amountInput.css'
import text from '../../text.json'
import BigNumber from 'bignumber.js';
import fileRoutes from '../../config/file-routes-config.json'
import {connect} from 'react-redux'
import Updater from '../../networking/utils/updater'
import {setRateAmount,updateTradeInfo, setSwapStatus,checkTokenAllowance,setIndependentField} from '../../store/actions/swapActions'
import {setToAmount,setAmount}  from '../../store/actions/walletActions'

const AmountInput = (props) => {
    const [hasError, setError] = useState(false)
    const [currencyOffset,setCurrencyOffset] = [props.amount?.toString().length * 9 + 5 || 30]
    const {currentWallet,fromToken,toToken,amount} = props.walletReducer
    const {allowanceAmount,slippageTolerance,trade,swapStatus} = props.swapReducer
    const showMax = props.hideMax || false
    const showFee = props.hideFee || false
    const coin = currentWallet?.network.toUpperCase()
    const feeProcent = +props.fee || 0.001
    const [isActive,setIsactive] = useState(swapStatus === 'approve')
    const getBalance = () => {
        if(fromToken.symbol === 'BNB') return currentWallet?.balance?.mainBalance
        if(fromToken.balance) return fromToken.balance
        return 0
       // if(props.name === 'OUTPUT' && toToken.balance) return toToken.balance
    }
    const balance = getBalance()
    const checkAmount = (val) => {
        props.setAmount(val)
        props.setIndependentField(props.name)
        props.setExactIn(props.name === 'INPUT' ? true : false)
        if(+val > 0){
            props.updateTradeInfo(val,props.name === 'INPUT' ? true : false)
            console.log(+props.inputAmount,'--inputAmount',props.amount)
            if((props.name === 'INPUT' && +val > balance) || (props.name === 'OUTPUT' && +props.inputAmount > balance) ){
                props.setSwapStatus('insufficientBalance')
            } else if((props.name === 'INPUT' && +val <= +balance - feeProcent) || (props.name === 'OUTPUT' && +props.inputAmount <= +balance - feeProcent)){
                if(BigNumber(allowanceAmount).div(BigNumber(Math.pow(10,+fromToken.decimals))) > +val || fromToken.symbol === 'BNB'){
                    if(parseFloat(props.slippage?.toFixed(2)||0) < +slippageTolerance){
                        props.setSwapStatus('swap')
                    }else{
                        props.setSwapStatus('swapAnyway')
                    }
                } else {
                    setIsactive(true)
                    props.setSwapStatus('approve')
                }
            } else {
                props.setSwapStatus('feeError')
            }
        } else {
            props.setSwapStatus('enterAmount')
        }
    }
    const setMaxAmount = () => {
        if(+balance-feeProcent < 0){
            props.setAmount(0)
            props.setSwapStatus('insufficientBalance')
        }else{
            checkAmount(+balance-feeProcent)
            props.updateTradeInfo(+balance-feeProcent, props.name === 'INPUT' ? true : false)
         
        }
    }
    useEffect(() => {
        let interval = null;
        if (isActive) {
          interval = setInterval(() => {
            props.checkTokenAllowance()
            if(allowanceAmount/Math.pow(10,+fromToken.decimals) > parseInt(amount)){
                props.setSwapStatus('swap')
                setIsactive(false)
            }
          }, 5000);
        } else if (!isActive) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [isActive,allowanceAmount,trade]);
    
    return(
        <div className='amount-container'>
            <div className='input-container' >
                <input className={hasError ? 'error-input' : undefined} type='number' value={props.amount} onChange={(e) => checkAmount(e.target.value)}/>
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

export default connect(mapStateToProps, {setIndependentField,checkTokenAllowance,setSwapStatus,setAmount,updateTradeInfo,setRateAmount,setToAmount}) (AmountInput);
