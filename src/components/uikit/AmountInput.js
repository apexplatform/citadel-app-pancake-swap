import { useState } from 'react'
import '../styles/components/amountInput.css'
import text from '../../text.json'
import fileRoutes from '../../config/file-routes-config.json'
import {connect} from 'react-redux'
import Updater from '../../networking/utils/updater'
import {setRateAmount,updateTradeInfo, setSwapStatus} from '../../store/actions/swapActions'
import {setToAmount,setAmount}  from '../../store/actions/walletActions'

const AmountInput = (props) => {
    const [hasError, setError] = useState(false)
    const {currentWallet,fromToken,fromTokenBalance} = props.walletReducer
    const balance = fromToken.symbol === 'BNB' ? currentWallet.amount : fromTokenBalance
    const {allowanceAmount,slippageTolerance,trade} = props.swapReducer
    const showMax = props.hideMax || false
    const outputAmount = trade?.outputAmount?.toExact() || 0
    const showFee = props.hideFee || false
    const coin = currentWallet.network.toUpperCase()
    const feeProcent = +props.fee || 0.003
    console.log(fromTokenBalance,'--fromTokenBalance')
    const checkAmount = (val) => {
        props.setAmount(val)
        props.setField(props.name)
        props.setExactIn(props.name === 'INPUT' ? true : false)
        if(+val > 0){
            props.updateTradeInfo(val, props.isExactIn)
            props.setToAmount(outputAmount)
            if(parseInt(val) > balance){
                props.setSwapStatus('insufficientBalance')
            }
            // else if (+props.amount == 0){
            //     props.setSwapStatus('loading')
            // }
            else if(parseInt(val) < +balance - feeProcent){
                if(allowanceAmount/Math.pow(10,+fromToken.decimals) > parseInt(val) || fromToken.symbol === 'BNB'){
                    if(parseFloat(props.slippage?.toFixed(2)||0) < +slippageTolerance){
                        props.setSwapStatus('swap')
                    }else{
                        props.setSwapStatus('swapAnyway')
                    }
                } else {
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
        if(balance-feeProcent < 0){
            props.setAmount(0)
            props.setSwapStatus('insufficientBalance')
        }else{
            checkAmount(balance-feeProcent)
        }
    
    }
    return(
        <div className='amount-container'>
            <div className='input-container' >
                <input className={hasError ? 'error-input' : undefined} type='number' value={props.amount} onChange={(e) => checkAmount(e.target.value)}/>
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

export default connect(mapStateToProps, {setSwapStatus,setAmount,updateTradeInfo,setRateAmount,setToAmount}) (AmountInput);
