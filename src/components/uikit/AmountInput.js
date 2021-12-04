import { useState } from 'react'
import '../styles/components/amountInput.css'
import text from '../../text.json'
import fileRoutes from '../../config/file-routes-config.json'
import {connect} from 'react-redux'
import {formatNumber} from '../helpers/numberFormatter'
import {setRateAmount,updatePoolInfo} from '../../store/actions/swapActions'
import {setFromAmount,setToAmount}  from '../../store/actions/walletActions'
const AmountInput = (props) => {
    const [hasError, setError] = useState(false)
    const {currentWallet} = props.walletReducer
    const balance = currentWallet?.balance?.mainBalance || 0
    const {poolInfo,initialRate,rate,slippage,slippageTolerance} = props.swapReducer
    const showMax = props.hideMax || false
    const showFee = props.hideFee || false
    const coin = currentWallet?.code.toUpperCase()
    const feeProcent = (+poolInfo?.poolParams?.swapFee * 100) || 1
    console.log(rate,'--rate')
    const checkAmount = (val) => {
        if(props.isFirst){
            props.setFromAmount(val)
            const amount = val * +rate * (100-feeProcent) * (1-+slippage) / 100
            const amount2 = val * +rate * (100-feeProcent) / 100
            props.setRateAmount(amount2)
            props.setToAmount(formatNumber(amount))
        }
        if(props.isSecond){
            props.setToAmount(val)
            const amount = val * +initialRate * (100+feeProcent) * (1+(+slippage)) / 100
            const amount2 = val * +initialRate * (100+feeProcent) / 100
            props.setFromAmount(formatNumber(amount))
            props.setRateAmount(amount2)
        }
        if(val > 0 && slippage < slippageTolerance){
            props.setDisabled(false)
        }
        if(parseInt(val) > +balance - feeProcent){
            setError(true)
        }else{
            setError(false)
        }
    }
    const setMaxAmount = () => {
        props.setAmount(balance-feeProcent)
    }
    const updatePoolInfo = (val) => {
        if (val > 0) props.updatePoolInfo(val)
    }
    return(
        <div className='amount-container'>
            <div className='input-container' >
                <input className={hasError ? 'error-input' : undefined} type='number' value={props.amount} onChange={(e) => checkAmount(e.target.value)} onBlur={(e) => updatePoolInfo(e.target.value)}/>
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
        </div>
    )
}

const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer,
    swapReducer: state.swapReducer
})

export default connect(mapStateToProps, {updatePoolInfo,setRateAmount,setFromAmount,setToAmount}) (AmountInput);
