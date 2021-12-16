import { ModalPage,Div } from '@vkontakte/vkui';
import {setActivePanel,setActiveModal} from '../../store/actions/panelActions'
import {connect} from 'react-redux';
import {useState,useEffect} from 'react'
import {prepareSwapTransfer,setTrade} from '../../store/actions/swapActions'
import {getcomputeTradePriceBreakdown,updateTradeInfo} from '../../store/actions/swapActions'
import '../styles/components/confirmModal.css'
import text from '../../text.json'
import ConfirmInfoBlock from '../uikit/ConfirmInfoBlock'
const ConfirmModal = (props) => {
    const {fromToken,toToken, amount,fromTokenAmount,toTokenAmount} = props.walletReducer
    const {trade,priceUpdated,isExactIn,updatedTrade} = props.swapReducer
    const [accept, setAccept] = useState(priceUpdated)
    const [accepted, setAccepted] = useState(true)
	const formattedPrice = trade?.executionPrice?.toSignificant(6)
	const { priceImpactWithoutFee, realizedLPFee } = props.getcomputeTradePriceBreakdown()
    const {activeModal} = props.panelReducer
    const acceptAndUpdate = () => {
        setAccept(false)
        setAccepted(false)
        props.setTrade(updatedTrade)
    }
    useEffect(() => {
        let interval = null;
        if (activeModal && accepted) {
            interval = setInterval(() => {
                props.updateTradeInfo(amount,isExactIn,false,true)
                setAccept(priceUpdated)
              
            }, 30000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval)
   }, [activeModal,trade,priceUpdated,fromTokenAmount,toTokenAmount])
    return(
        <ModalPage id="confirm" dynamicContentHeight onClose={() => props.setActiveModal(null)}>
            <div className='confirm-modal-header'>
                <p>{ text.CONFIRM_SWAP }</p>
                <img src='/img/icons/close.svg' alt ='icon' onClick={() => props.setActiveModal(null)}/>
            </div>
            <div className='separator-line'></div>
            <div className="confirm-modal-row">
                <div className='confirm-token-item'>
                    <div className='confirm-row'>
                        <div className="token-icon center">
                            <img src={fromToken.logoURI} alt ='icon'/>
                        </div>
                        <p className="token-symbol">{fromToken.name}</p>
                    </div>
                    <div className="token-content">  
                        <p className="token-amount">{fromTokenAmount || 0} <span>{fromToken.symbol}</span></p>
                    </div>
                </div>
                <img src='/img/icons/arrow-modal.svg' className='confirm-arrow' alt ='icon'/>
                <div className='confirm-token-item' id='blue-token'>  
                    <div className='confirm-row'>
                        <div className="token-icon center">
                            <img src={toToken.logoURI} alt ='icon'/>
                        </div>
                        <p className="token-symbol">{toToken.name}</p>
                    </div>
                    <div className="token-content">
                        <p className="token-amount">{toTokenAmount || 0} <span> {toToken.symbol}</span></p>
                    </div>
                </div>
            </div>
            {accept &&
            <Div className='accept-block'>
                <div>
                    <img src='/img/icons/info-modal.svg' alt ='icon'/>
                    <h3>{text.PRICE_UPDATED}</h3>
                </div>
                <button onClick={() => acceptAndUpdate()}>{text.ACCEPT}</button>
            </Div>}
            {/* <p className='confirm-alarm-text'>{text.CONFIRM_TEXT} <span>{amount} </span> {fromToken.symbol} {text.CONFIRM_TEXT_2}</p> */}
            <ConfirmInfoBlock accepted={accepted} name='confirm' rate={formattedPrice} priceImpact={priceImpactWithoutFee} fee={realizedLPFee?.toSignificant(4) || 0}/>
            <Div className='swap-btn' id={accept ? "disabled-btn" : undefined} onClick={() => {props.setActiveModal(null);props.prepareSwapTransfer();}}>
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

export default connect(mapStateToProps, {setTrade,updateTradeInfo,prepareSwapTransfer,getcomputeTradePriceBreakdown,setActiveModal,setActivePanel}) (ConfirmModal);
