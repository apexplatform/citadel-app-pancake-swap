import { Div, Group } from '@vkontakte/vkui';
import '../styles/components/swapButton.css'
import { Icon20ChevronRightOutline } from '@vkontakte/icons';
import {openConfirmModal,prepareApprove} from '../../store/actions/swapActions'
import {connect} from 'react-redux';
import Loader from '../uikit/Loader'
import text from '../../text.json'
import { useState } from 'react';
import ROUTES from '../../routes'
import {setActivePanel,setPreviosPanel} from '../../store/actions/panelActions'
const SwapButton = (props) => {
    const [approve,setApprove]  = useState(true)
    const {swapStatus,disableSwap} = props.swapReducer
    const {fromToken} = props.walletReducer
	return (
        <Group>
            {disableSwap ? 
            <Div className='swap-btn' id="disabled-btn">
                <span>{text.SWAP}</span>
            </Div>:
            <div>
             {swapStatus == 'swapAnyway' &&
            <Div className='swapAnyway-alarm' onClick={() => { props.setActivePanel(ROUTES.SETTINGS); props.setPreviosPanel(ROUTES.SWAP)}}>
                <span>{text.SWAP_ANYWAY_ALARM} <span className='bold-span'>{text.SETTINGS}</span></span>
                <Icon20ChevronRightOutline fill="#E5457A" width={26} height={26}/> 
            </Div>}
            {swapStatus == 'swap' &&
            <Div className='swap-btn' onClick={() => props.openConfirmModal(props.isExactIn)}>
                <span>{text.SWAP}</span>
            </Div>}
            {swapStatus == 'swapAnyway' &&
            <Div className='swap-btn' id="disabled-btn">
                <span>{text.SWAP}</span>
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
            <Div className='swap-btn' id="disabled-btn" >
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
                        <span>{text.APPROVE} {fromToken.symbol}</span>
                    </Div>
                    <Div className='swap-btn' id={approve ? "disabled-btn" : undefined}>
                        <span>{text.SWAP}</span>
                    </Div>
                </div>
            </Group>
            }
            </div>}
        </Group>
	); 
}
const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer,
	swapReducer: state.swapReducer
})

export default connect(mapStateToProps, {setPreviosPanel,prepareApprove,setActivePanel,openConfirmModal}) (SwapButton);
