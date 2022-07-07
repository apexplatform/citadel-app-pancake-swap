import { Modal, CustomIcon, InfoCardItem, SwapBalanceCard, BigButtons, InfoCardBlock, PriceUpdatedCard, } from '@citadeldao/apps-ui-kit/dist/main'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import { ONE_BIPS } from '../../networking/constants/constants';
import { errorActions, swapActions } from '../../store/actions';

const ConfirmModal = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const { minReceived, trade, tokenIn, tokenOut, amount, outAmout } = useSelector(state => state.swap)
    const formattedPrice = trade?.executionPrice?.toSignificant(6)
    const { priceImpactWithoutFee, realizedLPFee } = swapActions.getTradeFeePrice()
    const showConfirmModal = useSelector(state => state.errors.openConfirmModal)
    const [disabledSwap, setDisabledSwap] = useState(true)
    let routes = []
    if(trade?.route?.path){
        routes = trade?.route?.path.map(item => {
            return {
                logoURI: item.tokenInfo?.logoURI,
                name: item.symbol
            }
        })
    }
return(
    <Modal show={showConfirmModal && !location.pathname.includes('/info')} showModal={() => dispatch(errorActions.setConfirmModal(false))}>
    <div className='modal-header row'>
      <h4>Confirm swap</h4>
      <CustomIcon icon='close-modal' onClick={() => dispatch(errorActions.setConfirmModal(false))}/>
    </div>
    <div>
      <div className='row'>
          <SwapBalanceCard width='45%' amount={amount} bgColor='#B7F6FF' color='#00BFDB' token={{...tokenIn, code: tokenIn.symbol }} />
          <CustomIcon icon='arrow-swap' />
          <SwapBalanceCard width='45%' amount={outAmout} bgColor='#C6D1FF' color='rgba(58, 94, 229, 1)' token={{...tokenOut, code: tokenOut.symbol }} />
      </div>
      <PriceUpdatedCard style={{margin: '16px 0'}} acceptPrice={() => setDisabledSwap(false)} text='Price updated'/>
      <InfoCardBlock>
        <InfoCardItem text={'Price'} symbol={tokenIn.symbol} symbol2={tokenOut.symbol}><span className='purple-text'>{formattedPrice || '-'}</span></InfoCardItem>
        <InfoCardItem text={'Price impact'} symbol={'%'}><span className='green-text'>{priceImpactWithoutFee ? (priceImpactWithoutFee.lessThan(ONE_BIPS) ? '<0.01' : `${priceImpactWithoutFee.toFixed(2)}`) : '-'}</span></InfoCardItem>
        <InfoCardItem text={'Minimum received'} symbol={tokenOut.symbol}><span className='purple-text'>{minReceived !== 0 ? minReceived?.toSignificant(4) : minReceived}</span></InfoCardItem>
        <InfoCardItem text={'Liquidity Provider Fee'} symbol={tokenIn.symbol}><span className='pink-text'>{realizedLPFee?.toSignificant(4) || 0}</span></InfoCardItem>
        <InfoCardItem text={'Route'} routes={routes}/>
    </InfoCardBlock>
      <div className='center'>
          <BigButtons text='SWAP' disabled={disabledSwap} style={{marginTop: '20px'}} textColor='#FFFFFF' bgColor='#7C63F5'  hideIcon={true}/>
      </div>
    </div> 
  </Modal>
)}

export default ConfirmModal