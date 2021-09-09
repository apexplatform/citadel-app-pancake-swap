import {useState} from 'react'
import {connect} from 'react-redux';
import '../styles/components/addressInput.css'
import text from '../text.json'
const AddressInput = (props) => {
    const [address, setAddress] = useState('')
    const [hasError, setError] = useState(false)
    const checkAddress = (val) => {
        setAddress(val)
        if(val.length > 5){
            setError(true)
        }else{
            setError(false)
        }
    }
    return(
        <div className="address-input">
            <input className={hasError && 'error-input'} value={address} onChange={(e) => checkAddress(e.target.value)}/>
            {hasError &&
            <div className='address-error-container'>
                <img src='/img/icons/error.svg' alt='error'/>
                <span>{text.ERRORS.INVALID_KEY}</span>
            </div>}
        </div>
    )
}

const mapStateToProps=(state)=>({
	addressReducer: state.addressReducer
})

export default connect(mapStateToProps, {}) (AddressInput);
