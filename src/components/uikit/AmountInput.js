import { useState } from 'react'
import '../styles/components/amountInput.css'
import text from '../../text.json'
import {Dec,IntPretty} from '@keplr-wallet/unit'
import fileRoutes from '../../config/file-routes-config.json'
import {connect} from 'react-redux'
import {calculateSlippage} from '../../store/actions/swapActions'
import {setFromAmount,setToAmount}  from '../../store/actions/walletActions'
const AmountInput = (props) => {
    const [hasError, setError] = useState(false)
    const {currentWallet} = props.walletReducer
    const balance = currentWallet.amount || 0
    const {poolInfo,initialRate,rate} = props.swapReducer
    const showMax = props.hideMax || false
    const showFee = props.hideFee || false
    const coin = currentWallet.network.toUpperCase()
    const feeProcent = (+poolInfo?.poolParams?.swapFee * 100) || 1
    const checkAmount = (val) => {
        if(props.isFirst){
            props.setFromAmount(val)
            const decval = new Dec((val * +rate * (100-feeProcent) / 100).toString())
            const intval = new IntPretty(decval).trim(true).maxDecimals(3).toString()
            props.setToAmount(intval.replaceAll(',',''))
        }
        if(props.isSecond){
            props.setToAmount(val)
            const decval2 = new Dec((val * +initialRate * (100+feeProcent) / 100).toString())
            const intval2 = new IntPretty(decval2).trim(true).maxDecimals(3).toString()
            props.setFromAmount(intval2.replaceAll(',',''))
        }
        if(val.length) props.calculateSlippage(val)
        if(parseInt(val) > +balance - feeProcent){
            setError(true)
        }else{
            setError(false)
        }
    }
    const setMaxAmount = () => {
        props.setAmount(balance-feeProcent)
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
				<span className='fee-amount'>{fee} </span>
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

export default connect(mapStateToProps, {calculateSlippage,setFromAmount,setToAmount}) (AmountInput);
