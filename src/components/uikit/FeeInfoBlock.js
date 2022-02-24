import {connect} from 'react-redux';
import '../styles/components/feeInfoBlock.css'
import {ONE_BIPS} from '../../networking/constants/constants'
import text from '../../text.json'
import { Icon20ChevronRightOutline } from '@vkontakte/icons';
const FeeInfoBlock = (props) => {
    const {fromToken,toToken} = props.walletReducer
    const {minReceived,trade,swapStatus} = props.swapReducer
    const {rate,priceImpact,fee} = props
    let path = []
    if(fromToken.symbol == 'BNB' && toToken.symbol == 'WBNB'){
        path.push({...fromToken,tokenInfo:fromToken})
        path.push({...toToken,tokenInfo:toToken})
    }else if(fromToken.symbol == 'WBNB' && toToken.symbol == 'BNB'){
        path.push({...fromToken,tokenInfo:fromToken})
        path.push({...toToken,tokenInfo:toToken})
    }else if(trade?.route?.path){
        path = trade?.route?.path
    }
    return(
        <div className='fee-info-block'>
           <div className='fee-row'>
                <span className='fee-text'>
                    {text.PRICE}
                </span>
                {rate ?
                <span>
                    <span className='fee-text'>{rate}  </span>
                    {toToken.symbol} per { fromToken.symbol}
                </span>: <span className='fee-text'>-</span>}
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
                    {text.MINIMUM_RECEIVED}
                </span>
                <span>
                    <span className='fee-text'> {minReceived != 0 ? minReceived?.toSignificant(4) : minReceived} </span>
                    { toToken.symbol}
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
           <div className='fee-row'>
                <span className='fee-text'>
                    {text.ROUTE}
                </span>
                {path.length ? 
                <div className='route-row'>
                    { path.map((token,i) => (
                        <span className='route-row' key={i}>
                           {token.tokenInfo?.logoURI && <img src={token.tokenInfo?.logoURI} alt='t'/>}
                            {token.symbol}
                            { i < path.length-1 && <Icon20ChevronRightOutline fill='#C5D0DB' width={25} height={25}/>}
                        </span>
                    ))
                    }
                </div> : '-'}
           </div>
        </div>
    )
}
const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer,
    swapReducer: state.swapReducer
})

export default connect(mapStateToProps, {}) (FeeInfoBlock);
