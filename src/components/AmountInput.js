import { useState } from 'react'
import '../styles/components/amountInput.css'
import text from '../text.json'
import fileRoutes from '../config/file-routes-config.json'
const AmountInput = (props) => {
    const [amount, setAmount] = useState(0)
    const [hasError, setError] = useState(false)
    const balance = 12
    const fee = 0.343
    const coin = 'ETH'
    const checkAmount = (val) => {
        setAmount(val)
        if(parseInt(val) > +balance - fee){
            setError(true)
        }else{
            setError(false)
        }
    }
    const setMaxAmount = () => {
        setAmount(balance-fee)
    }
    return(
        <div className='amount-container'>
            <div className='input-container' >
                <input className={hasError ? 'error-input' : undefined} type='number' value={amount} onChange={(e) => checkAmount(e.target.value)}/>
                <button className='max-btn' onClick={() => setMaxAmount()}>Max</button>
            </div>
            <div className='fee-container'>
				<h5>{text.FEE_TEXT}</h5>
				<span className='fee-amount'>{fee} </span>
				<h5>{coin}</h5>
			</div>
            {hasError &&
            <div className='fee-container'>
                <img src={fileRoutes.ERROR_ICON} alt='error'/>
                <span className='amount-error-text'>{text.ERRORS.INSUFFICIENT_FUNDS}</span>
            </div>}
        </div>
    )
}

export default AmountInput