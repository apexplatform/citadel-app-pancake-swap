import { Div, Group } from '@vkontakte/vkui';
import '../styles/components/swapButton.css'
import {prepareSwapTransfer,prepareApprove} from '../../store/actions/swapActions'
import {connect} from 'react-redux';
import Loader from '../uikit/Loader'
import text from '../../text.json'
import { useState } from 'react';
const SwapButton = (props) => {
    const [approve,setApprove]  = useState(true)
    const {swapStatus} = props.swapReducer
    const {fromToken} = props.walletReducer
	return (
        <Group>
            {swapStatus == 'swap' &&
            <Div className='swap-btn' onClick={() => props.prepareSwapTransfer()}>
                <span>Swap</span>
            </Div>}
            {swapStatus == 'swapAnyway' &&
            <Div className='swap-btn swap-anyway-btn' onClick={() => props.prepareSwapTransfer()}>
                <span>Swap Anyway</span>
            </Div>}
            {swapStatus == 'loading' &&
            <Div className='swap-btn loading-btn' id="disabled-btn">
                <Loader/><span>{text.LOADING}</span>
            </Div>}
            {swapStatus == 'feeError' &&
            <Div className='swap-btn' id="disabled-btn">
                <span>{text.FEE_ERROR_TEXT}</span>
            </Div>}
            {swapStatus == 'insufficientBalance' &&
            <Div className='swap-btn' id="disabled-btn" onClick={() => props.prepareSwapTransfer()}>
                <span>Insufficient {fromToken.symbol} balance </span>
            </Div>}
            {swapStatus == 'enterAmount' &&
            <Div className='swap-btn' id="disabled-btn">
                <span>{text.ENTER_AMOUNT}</span>
            </Div>}
            {swapStatus == 'approve' &&
            <Group className='approve-block'>
                <Div className='approve-lines'>
                    <p className='number-circle' id={!approve ? "disabled-circle" : undefined}>1</p>
                    <div className='solid-line' id={!approve ? "disabled-line" : undefined}></div>
                    <div className='solid-line' id={approve ? "disabled-line" : undefined}></div>
                    <p className='number-circle' id={approve ? "disabled-circle" : undefined}>2</p>
                </Div>
                <div className='approve-row'>
                    <Div className='swap-btn' onClick={() => props.prepareApprove()} id={!approve ? "disabled-btn" : undefined}>
                        <span>Approve {fromToken.symbol}</span>
                    </Div>
                    <Div className='swap-btn' onClick={() => props.prepareSwapTransfer()}  id={approve ? "disabled-btn" : undefined}>
                        <span>Swap</span>
                    </Div>
                </div>
            </Group>
            }
        </Group>
	); 
}
const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer,
	swapReducer: state.swapReducer
})

export default connect(mapStateToProps, {prepareApprove,prepareSwapTransfer}) (SwapButton);
