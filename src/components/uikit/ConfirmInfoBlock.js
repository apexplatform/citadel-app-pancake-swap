import {connect} from 'react-redux';
import '../styles/components/feeInfoBlock.css'
import {ONE_BIPS} from '../../networking/constants/constants'
import text from '../../text.json'
const ConfirmInfoBlock = (props) => {
    const {fromToken,toToken} = props.walletReducer
    const {minReceived,swapStatus,iconStatus} = props.swapReducer
    const {rate,priceImpact,fee} = props
    return(
        <div className='fee-info-block'>
           <div className='fee-row'>
                <span className='fee-text'>
                    {text.PRICE}
                </span>
                {rate ?
                <span>
                    <span className='fee-text'>
                        {props.accepted ?
                        <img src='/img/icons/triangle.svg' id={iconStatus} className='triangle-icon' alt ='icon'/>: ''}
                        {rate}
                    </span> 
                    {' ' + toToken.symbol} per { fromToken.symbol}
                </span> : <span className='fee-text'>-</span>}
           </div> 
           <div className='fee-row'>
                <span className='fee-text'>
                    {text.MINIMUM_RECEIVED}
                </span>
                <span>
                    <span className='fee-text'> 
                        {props.accepted ?
                        <img src='/img/icons/triangle.svg' id={iconStatus} className='triangle-icon' alt ='icon'/>: ''}
                        {minReceived != 0 ? minReceived?.toSignificant(4) : minReceived} 
                    </span>
                    { ' ' + toToken.symbol}
                </span>
           </div>
           <div className='fee-row' id={swapStatus == 'swapAnyway' ? 'bold-text' : undefined}>
                <span className='fee-text'>
                    {text.PRICE_IMPACT}
                </span>
                <span className='fee-text'>
                    {priceImpact ? (priceImpact.lessThan(ONE_BIPS) ? '<0.01' : `${priceImpact.toFixed(2)}`) : '-'}
                    <span>{ priceImpact ? '%' : ''} </span>
                </span>
           </div>
           <div className='fee-row'>
                <span className='fee-text'>
                    {text.PROVIDER_FEE_TEXT}
                </span>
                <span>
                    <span className='fee-text'> {fee} </span>
                    {fromToken.symbol}
                </span>
           </div>
        </div>
    )
}
const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer,
    swapReducer: state.swapReducer
})

export default connect(mapStateToProps, {}) (ConfirmInfoBlock);
