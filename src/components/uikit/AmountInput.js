import { useState,useEffect,useRef } from 'react'
import '../styles/components/amountInput.css'
import text from '../../text.json'
import fileRoutes from '../../config/file-routes-config.json'
import {connect} from 'react-redux'
import {setRateAmount,updateTradeInfo,setSwapDisable,checkSwapStatus, setSwapStatus,checkTokenAllowance,setIndependentField,getFromBalance} from '../../store/actions/swapActions'
import {setToAmount,setAmount}  from '../../store/actions/walletActions'
import BigNumber from 'bignumber.js';
import {numberWithCommas} from '../helpers/numberFormatter'
const AmountInput = (props) => {
    const [hasError, setError] = useState(false)
    const [currencyOffset,setCurrencyOffset] = [(props.amount?.toString().length + 1) * 8 || 30]
    const {currentWallet,fromToken,toToken,amount} = props.walletReducer
    const {allowanceAmount,trade,swapStatus} = props.swapReducer
    const showMax = props.hideMax || false
    const showFee = props.hideFee || false
    const coin = currentWallet?.code
    const fee = coin == fromToken.symbol ? 0.01 : 0
    const [isActive,setIsactive] = useState(swapStatus === 'approve')
    const balance = props.getFromBalance()
    let isBNB = false
    if(fromToken.symbol == 'BNB' && toToken.symbol == 'WBNB'){
        isBNB = true
    }else if(fromToken.symbol == 'WBNB' && toToken.symbol == 'BNB'){
        isBNB = true
    }
    const checkAmount = (val,isMax = false) => {
        val = val.replace(/[^0-9\.]/g, '')
        if(+props.amount == 0 && val.length == 2 && val[1] != '.' && val[1] == '0'){
            props.setAmount(val[0]);
        }else if(val[0] == '0' && val[1] != '.' ){
            props.setAmount(BigNumber(val).toFixed())
        } else {
            props.setAmount(val);
        }
        props.setIndependentField(props.name)
        props.setSwapDisable(false)
        props.setExactIn(props.name === 'INPUT' ? true : false)
        if(+val > 0){
            !isBNB && props.updateTradeInfo(val,props.name === 'INPUT' ? true : false)
            props.checkSwapStatus(val,setIsactive,isMax,props.name === 'INPUT' ? true : false)
        } else {
            props.setSwapStatus('enterAmount')
        }
    }
    const setMaxAmount = () => {
        if(BigNumber(balance).minus(fee).toNumber() <= 0){
            props.setAmount(0)
            props.setSwapStatus('insufficientBalance')
        }else{
            let balanceWithoutFee = BigNumber(balance).minus(fee).toString()
            if(balanceWithoutFee.includes('e')){
                balanceWithoutFee = BigNumber(balanceWithoutFee).toFixed(10).replace(/\.?0+$/,"")
            }
            checkAmount(balanceWithoutFee,true)
        }
    }
    const checkValue = (val) => {
        if(val.length == 0){
            props.setAmount(0)
        }
    }
    useEffect(() => {
        let interval = null;
        if(props.name === 'INPUT'){
            if (isActive) {
                interval = setInterval(() => {
                  props.checkTokenAllowance()
                  if(allowanceAmount/Math.pow(10,+fromToken.decimals) > parseInt(amount)){
                      props.setSwapStatus('swap')
                      setIsactive(false)
                  }
                }, 5000);
              } else {
                clearInterval(interval);
              }
              return () => clearInterval(interval);
        }
      }, [isActive,allowanceAmount,trade]);
    return(
        <div className='amount-container'>
             <div className='balance-container'>
				<h5>{text.BALANCE}:</h5>
				<span className='balance-amount'> {props.name === 'INPUT' ? numberWithCommas(fromToken.balance) : numberWithCommas(toToken.balance)} </span>
				<h5>{props.name === 'INPUT' ? fromToken.symbol : toToken.symbol}</h5>
			</div>
            <div className='input-container' >
                <input className={hasError ? 'error-input' : undefined} value={props.amount} onChange={(e) => checkAmount(e.target.value)} onBlur={(e) => checkValue(e.target.value)}/>
                <span className='input-currency' style={{ left: `${currencyOffset}px` }}>{props.name === 'INPUT' ? fromToken.symbol : toToken.symbol}</span>
                {showMax && <button className='max-btn' onClick={() => setMaxAmount()}>Max</button>}
            </div>
         
            {showFee &&
            <div className='fee-container'>
				<h5>{text.FEE_TEXT}</h5>
				<span className='fee-amount'>{fee} </span>
				<h5>{coin}</h5>
			</div>}
            {hasError &&
            <div className='fee-container'>
                <img src={fileRoutes.ERROR_ICON} alt='error'/>
                <span className='amount-error-text'>{text.ERRORS.INSUFFICIENT_FUNDS}</span>
            </div>}
            {/* <Updater/> */}
        </div>
    )
}

const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer,
    swapReducer: state.swapReducer
})

export default connect(mapStateToProps, {setSwapDisable,checkSwapStatus,setIndependentField,getFromBalance,checkTokenAllowance,setSwapStatus,setAmount,updateTradeInfo,setRateAmount,setToAmount}) (AmountInput);
