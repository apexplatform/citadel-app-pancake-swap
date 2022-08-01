import { BigButtons } from '@citadeldao/apps-ui-kit/dist/main';
import { useSelector, useDispatch } from 'react-redux';
import { swapActions } from '../../store/actions';
const SwapButton = (props) => {
    const { swapStatus, tokenIn, disableSwap } = useSelector((state) => state.swap)
    const dispatch = useDispatch()
    const customStyle = {
        width: 'auto',
        marginTop: '20px',
    }
	return (
        <div className='center'>
            {(props.isBNB && tokenIn === 'BNB') && <BigButtons disabled={disableSwap} text='DEPOSIT' onClick={() => dispatch(swapActions.getSwapTransaction())} style={customStyle} textColor='#FFFFFF' bgColor='#7C63F5' hideIcon={true}/>}
            {(props.isBNB && tokenIn === 'WBNB') && <BigButtons disabled={disableSwap} text='WITHDRAW' onClick={() => dispatch(swapActions.getSwapTransaction())} style={customStyle} textColor='#FFFFFF' bgColor='#7C63F5' hideIcon={true}/>}
            {swapStatus === 'enterAmount' && <BigButtons text='ENTER AMOUNT' disabled style={customStyle} textColor='#FFFFFF' bgColor='#7C63F5' hideIcon={true}/>}
            {swapStatus === 'swap' && <BigButtons disabled={disableSwap} onClick={() => swapActions.checkTradeUpdate()} text='SWAP' style={{marginTop: '20px'}} textColor='#FFFFFF' bgColor='#7C63F5'  hideIcon={true}/>}
            {swapStatus === 'swapAnyway' && <BigButtons disabled={disableSwap}  onClick={() => swapActions.checkTradeUpdate()} text='SWAP ANYWAY' style={customStyle} textColor='#FFFFFF' bgColor='#FF5722' hideIcon={true}/>}
            {swapStatus === 'insufficientBalance' && <BigButtons disabled text={`Insufficient ${tokenIn.symbol} balance`} style={customStyle} textColor='#FFFFFF' bgColor='#7C63F5'  hideIcon={true}/>}
            {swapStatus === 'feeError' && <BigButtons disabled text='Insufficient balance for swap fee' style={customStyle} textColor='#FFFFFF' bgColor='#7C63F5'  hideIcon={true}/>}
            {swapStatus === 'approve' && 
            <div>
                <div className='approve-step-block'>
                    <div className='approve-step-row'>
                        <span className='active-circle'></span>
                        <hr/>
                        <span></span>
                    </div>
                    <div className='approve-step-row'>
                        <p className='active-step'>1</p>
                        <p>2</p>
                    </div>
                </div>
                <div className='row'>
                    <BigButtons disabled={disableSwap} onClick={() => dispatch(swapActions.getApproveTransaction())} text={`APPROVE ${tokenIn.symbol}`} style={{marginRight: '10px'}} textColor='#FFFFFF' bgColor='#7C63F5'  hideIcon={true}/>
                    <BigButtons text={'SWAP'} style={{marginLeft: '10px'}} disabled textColor='#FFFFFF' hideIcon={true}/>
                </div>
            </div>}
        </div>
	); 
}
export default SwapButton