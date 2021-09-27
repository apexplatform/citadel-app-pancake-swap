import { useState } from 'react'
import '../styles/components/amountInput.css'
import text from '../../text.json'
import fileRoutes from '../../config/file-routes-config.json'
import {connect} from 'react-redux'
import {setFromAmount,setToAmount}  from '../../store/actions/walletActions'
const AmountInput = (props) => {
    const [hasError, setError] = useState(false)
    const {currentWallet} = props.walletReducer
    const balance = currentWallet.amount || 0
    const fee = 0.343
    const showMax = props.hideMax || false
    const showFee = props.hideFee || false
    const coin = currentWallet.network.toUpperCase()
    const rate = 0.5
    const feeProcent = 1
    const checkAmount = (val) => {
        if(props.isFirst){
            props.setFromAmount(val)
            props.setToAmount(val * rate * (100-feeProcent) / 100 )
        }
        if(props.isSecond){
            props.setToAmount(val)
            props.setFromAmount((val * 100) / (rate * (100-feeProcent)))
        }
        if(parseInt(val) > +balance - fee){
            setError(true)
        }else{
            setError(false)
        }
    }
    const setMaxAmount = () => {
        props.setAmount(balance-fee)
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
	walletReducer: state.walletReducer
})

export default connect(mapStateToProps, {setFromAmount,setToAmount}) (AmountInput);
