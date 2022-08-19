import { Modal, CustomIcon, ModalHeader, InfoCardItem, SwapBalanceCard, BigButtons, InfoCardBlock, PriceUpdatedCard, } from '@citadeldao/apps-ui-kit/dist/main'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import { errorActions } from '../../store/actions';

const ConfirmModal = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const { amount, tokenIn, tokenOut, rate, routes, outAmout } = useSelector(state => state.swap)
    const showConfirmModal = useSelector(state => state.errors.openConfirmModal)
    const [disabledSwap, setDisabledSwap] = useState(true)
   
return(
  <Modal show={showConfirmModal && !location.pathname.includes('/info')} showModal={() => dispatch(errorActions.setConfirmModal(false))}>
    <ModalHeader title="Confirm swap" onClick={() => dispatch(errorActions.setConfirmModal(false))}/>
    <div>
      <div className='row'>
          <SwapBalanceCard width='45%' amount={amount} bgColor='#B7F6FF' color='#00BFDB' token={tokenIn} />
          <CustomIcon icon='arrow-swap' />
          <SwapBalanceCard width='45%' amount={outAmout} bgColor='#C6D1FF' color='rgba(58, 94, 229, 1)' token={tokenOut} />
      </div>
      <PriceUpdatedCard style={{margin: '16px 0'}} acceptPrice={() => setDisabledSwap(false)} text='Price updated'/>
      <InfoCardBlock>
          <InfoCardItem text={'Price'} amount={rate} symbol={'OSMO'} symbol2={'ATOM'}/>
          <InfoCardItem text={'Price impact'} amount={10} symbol={'%'}/>
          <InfoCardItem text={'Minimum received'} amount={1} symbol={'OSMO'}/>
          <InfoCardItem text={'Liquidity Provider Fee'} amount={5} symbol={'%'}/>
          <InfoCardItem text={'Route'} routes={routes}/>
      </InfoCardBlock>
      <div className='center'>
          <BigButtons text='SWAP' disabled={disabledSwap} style={{marginTop: '20px'}} textColor='#FFFFFF' bgColor='#7C63F5'  hideIcon={true}/>
      </div>
    </div> 
  </Modal>
)}

export default ConfirmModal