import { Button } from '@citadeldao/apps-ui-kit/dist/main';
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
            {(props.isBNB && tokenIn === 'BNB') && <Button disabled={disableSwap} onClick={() => dispatch(swapActions.getSwapTransaction())} style={customStyle} textColor='#FFFFFF' bgColor='#7C63F5' hoverBgColor='#5639E0'>DEPOSIT</Button>}
            {(props.isBNB && tokenIn === 'WBNB') && <Button disabled={disableSwap} onClick={() => dispatch(swapActions.getSwapTransaction())} style={customStyle} textColor='#FFFFFF' bgColor='#7C63F5' hoverBgColor='#5639E0'>WITHDRAW</Button>}
            {swapStatus === 'enterAmount' && <Button disabled style={customStyle} textColor='#FFFFFF' bgColor='#7C63F5' hidename={true}>ENTER AMOUNT</Button>}
            {swapStatus === 'swap' && <Button disabled={disableSwap} onClick={() => swapActions.checkTradeUpdate()} style={{marginTop: '20px'}} textColor='#FFFFFF' bgColor='#7C63F5' hoverBgColor='#5639E0'>SWAP</Button>}
            {swapStatus === 'swapAnyway' && <Button disabled={disableSwap}  onClick={() => swapActions.checkTradeUpdate()} style={customStyle} textColor='#FFFFFF' bgColor='#FF5722' hoverBgColor='#5639E0'>SWAP ANYWAY</Button>}
            {swapStatus === 'insufficientBalance' && <Button disabled style={customStyle} textColor='#FFFFFF' bgColor='#7C63F5'>{`Insufficient ${tokenIn.code} balance`}</Button>}
            {swapStatus === 'feeError' && <Button disabled style={customStyle} textColor='#FFFFFF' bgColor='#7C63F5'>Insufficient balance for swap fee</Button>}
            {swapStatus === 'disabled' && <Button disabled style={customStyle} textColor='#FFFFFF' bgColor='#7C63F5'>SWAP</Button>}

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
                    <Button disabled={disableSwap} onClick={() => dispatch(swapActions.getApproveTransaction())} hoverBgColor='#5639E0' style={{marginRight: '10px'}} textColor='#FFFFFF' bgColor='#7C63F5'>{`APPROVE ${tokenIn.symbol}`}</Button>
                    <Button style={{marginLeft: '10px'}} disabled>SWAP</Button>
                </div>
            </div>}
        </div>
	); 
}
export default SwapButton