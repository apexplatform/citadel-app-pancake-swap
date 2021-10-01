import {connect} from 'react-redux';
import '../styles/components/feeInfoBlock.css'
const FeeInfoBlock = (props) => {
    const {fromToken,toToken} = props.walletReducer
    const {slippage} = props.swapReducer
    return(
        <div className='fee-info-block'>
           <div className='fee-row'>
                <span className='fee-text'>
                    Rate
                </span>
                <span>
                    <span className='fee-text'>1 </span>
                    {fromToken.code} =  
                    <span className='fee-text'> {props.rate} </span>
                    {toToken.code}
                </span>
           </div>
           <div className='fee-row'>
                <span className='fee-text'>
                    Swap fee
                </span>
                <span>
                    <span className='fee-text'> {props.fee} </span>
                    %
                </span>
           </div>
           <div className='separator'></div>
           <div className='fee-row'>
                <span className='fee-text-bold'>
                    Estimated slippage
                </span>
                <span>
                    <span className='fee-amount-bold'>{slippage} </span>
                    %
                </span>
           </div>
        </div>
    )
}
const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer,
    swapReducer: state.swapReducer
})

export default connect(mapStateToProps, {}) (FeeInfoBlock);
