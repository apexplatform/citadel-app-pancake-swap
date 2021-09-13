import '../styles/components/amountToken.css'
import {connect} from 'react-redux'
import {setAmount}  from '../store/actions/addressActions'
const AmountToken = (props) => {
    const {toToken} = props.addressReducer
    return(
        <div className='amount-token-container'>
            <span>{props.balance}<span className='token-amount-grey'>{toToken.network}</span></span>
        </div>
    )
}

const mapStateToProps=(state)=>({
	addressReducer: state.addressReducer
})

export default connect(mapStateToProps, {setAmount}) (AmountToken);
