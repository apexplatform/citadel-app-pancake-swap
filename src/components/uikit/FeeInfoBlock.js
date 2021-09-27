import {connect} from 'react-redux';
import '../styles/components/feeInfoBlock.css'
const FeeInfoBlock = (props) => {
    const {fromToken,toToken} = props.walletReducer
    return(
        <div className='fee-info-block'>
           <div className='fee-row'>
                <span className='fee-text'>
                    Rate
                </span>
                <span>
                    <span className='fee-text'>1 </span>
                    {fromToken.network} =  
                    <span className='fee-text'> {props.rate} </span>
                    {toToken.network}
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
                    <span className='fee-amount-bold'>0.005 </span>
                    %
                </span>
           </div>
        </div>
    )
}
const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer
})

export default connect(mapStateToProps, {}) (FeeInfoBlock);
