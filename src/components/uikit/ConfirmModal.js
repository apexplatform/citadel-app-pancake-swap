import { Modal, CustomIcon, InfoCardItem, SwapBalanceCard, BigButtons, InfoCardBlock, PriceUpdatedCard, } from '@citadeldao/apps-ui-kit/dist/main'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import { ONE_BIPS } from '../../networking/constants/constants';
import { errorActions, swapActions } from '../../store/actions';

const ConfirmModal = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const { minReceived, updatedTrade, tokenIn, tokenOut, amountIn, amountOut } = useSelector(state => state.swap)
    const formattedPrice = updatedTrade?.executionPrice?.toSignificant(6)
    const { priceImpactWithoutFee, realizedLPFee } = swapActions.getTradeFeePrice(updatedTrade)
    const showConfirmModal = useSelector(state => state.errors.openConfirmModal)
    const [disabledSwap, setDisabledSwap] = useState(true)
    const swap = () => {
      dispatch(swapActions.getSwapTransaction());
      setTimeout(() => {
        dispatch(errorActions.setConfirmModal(false));
      },2000)
    }
    const acceptTrade = () => {
      dispatch(swapActions.setTrade(updatedTrade));
      setDisabledSwap(false)
    }
return(
    <Modal show={showConfirmModal && !location.pathname.includes('/info')} showModal={() => dispatch(errorActions.setConfirmModal(false))}>
    <div className='modal-header row'>
      <h4>Confirm swap</h4>
      <CustomIcon icon='close-modal' onClick={() => dispatch(errorActions.setConfirmModal(false))}/>
    </div>
    <div>
      <div className='row'>
          <SwapBalanceCard width='45%' amount={amountIn} bgColor='#B7F6FF' color='#00BFDB' token={{...tokenIn, code: tokenIn.symbol }} />
          <CustomIcon icon='arrow-swap' />
          <SwapBalanceCard width='45%' amount={amountOut} bgColor='#C6D1FF' color='rgba(58, 94, 229, 1)' token={{...tokenOut, code: tokenOut.symbol }} />
      </div>
      { disabledSwap && <PriceUpdatedCard style={{margin: '16px 0'}} acceptPrice={() => acceptTrade()} text='Price updated'/> }
      <InfoCardBlock>
        <InfoCardItem text={'Price'} symbol={tokenIn.symbol} symbol2={tokenOut.symbol}>
          <span className='purple-text'>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.681641 7.75006L5.99989 0.067811L11.3181 7.75006L0.681641 7.75006Z" fill="#ED4242"/>
            </svg>
            {formattedPrice || '-'}
          </span>
        </InfoCardItem>
        <InfoCardItem text={'Minimum received'} symbol={tokenOut.symbol}>
          <span className='purple-text'>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.681641 7.75006L5.99989 0.067811L11.3181 7.75006L0.681641 7.75006Z" fill="#ED4242"/>
            </svg>
            {minReceived !== 0 ? minReceived?.toSignificant(4) : minReceived}
          </span>
        </InfoCardItem>
        <InfoCardItem text={'Price impact'} symbol={'%'}><span className='green-text'>{priceImpactWithoutFee ? (priceImpactWithoutFee.lessThan(ONE_BIPS) ? '<0.01' : `${priceImpactWithoutFee.toFixed(2)}`) : '-'}</span></InfoCardItem>
        <InfoCardItem text={'Liquidity Provider Fee'} symbol={tokenIn.symbol}><span className='pink-text'>{realizedLPFee?.toSignificant(4) || 0}</span></InfoCardItem>
      </InfoCardBlock>
      <div className='center'>
        <BigButtons text='SWAP' onClick={() => swap()} disabled={disabledSwap} style={{marginTop: '20px'}} textColor='#FFFFFF' bgColor='#7C63F5'  hideIcon={true}/>
      </div>
    </div> 
  </Modal>
)}

export default ConfirmModal