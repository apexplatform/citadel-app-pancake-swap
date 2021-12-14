import { ModalPage,Div } from '@vkontakte/vkui';
import {setActivePanel,setActiveModal} from '../../store/actions/panelActions'
import {connect} from 'react-redux';
import {prepareSwapTransfer} from '../../store/actions/swapActions'
import {getcomputeTradePriceBreakdown} from '../../store/actions/swapActions'
import '../styles/components/confirmModal.css'
import text from '../../text.json'
import FeeInfoBlock from '../uikit/FeeInfoBlock'
const ConfirmModal = (props) => {
    const {fromToken,toToken, amount,fromTokenAmount,toTokenAmount} = props.walletReducer
    const {trade} = props.swapReducer
	const formattedPrice = trade?.executionPrice?.toSignificant(6)
	const { priceImpactWithoutFee, realizedLPFee } = props.getcomputeTradePriceBreakdown()
    return(
        <ModalPage id="confirm" dynamicContentHeight onClose={() => props.setActiveModal(null)}>
            <div class='confirm-modal-header'>
                <p>{ text.CONFIRM_SWAP }</p>
                <img src='/img/icons/close.svg' alt ='icon' onClick={() => props.setActiveModal(null)}/>
            </div>
            <div className='separator-line'></div>
            <div className="confirm-modal-row">
                <div className='confirm-token-item'>
                    <div className="token-icon center">
                        <img src={fromToken.logoURI} alt ='icon'/>
                    </div>
                    <div className="token-content">
                        <p className="token-symbol">{fromToken.name}</p>
                        <p className="token-amount">{fromTokenAmount || 0} <span>{fromToken.symbol}</span></p>
                    </div>
                </div>
                <img src='/img/icons/arrow-modal.svg' alt ='icon'/>
                <div className='confirm-token-item' id='blue-token'>
                    <div className="token-icon center">
                        <img src={toToken.logoURI} alt ='icon'/>
                    </div>
                    <div className="token-content">
                        <p className="token-symbol">{toToken.name}</p>
                        <p className="token-amount">{toTokenAmount || 0} <span> {toToken.symbol}</span></p>
                    </div>
                </div>
            </div>
            <p className='confirm-alarm-text'>{text.CONFIRM_TEXT} <span>{amount} </span> {fromToken.symbol} {text.CONFIRM_TEXT_2}</p>
            <FeeInfoBlock name='confirm' rate={formattedPrice} priceImpact={priceImpactWithoutFee} fee={realizedLPFee?.toSignificant(4) || 0}/>
            <Div className='swap-btn' onClick={() => props.prepareSwapTransfer()}>
                <span>{text.SWAP}</span>
            </Div>
        </ModalPage>
	  );
}

const mapStateToProps=(state)=>({
	panelReducer: state.panelReducer,
    walletReducer: state.walletReducer,
    swapReducer: state.swapReducer
})

export default connect(mapStateToProps, {prepareSwapTransfer,getcomputeTradePriceBreakdown,setActiveModal,setActivePanel}) (ConfirmModal);
