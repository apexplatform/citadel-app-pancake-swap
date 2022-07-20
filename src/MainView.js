import React, {useState,useEffect} from 'react'
import './components/styles/panels/index.css'
import GuidesPanel from './components/panels/GuidesPanel'
import ROUTES from "./routes";
import SwapPanel from './components/panels/SwapPanel'
import TransactionsPanel from './components/panels/TransactionsPanel'
import TransactionsDetailsPanel from './components/panels/TransactionDetails'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { errorActions } from './store/actions'
import PoolsPanel from './components/panels/PoolsPanel'
import text from './text.json'
import AddPoolPanel from './components/panels/AddPoolPanel'
import { useNavigate } from 'react-router-dom';
import { StatusPopup, PopupWindow, CustomIcon, InfoCardItem, SwapBalanceCard, BigButtons, InfoCardBlock, PriceUpdatedCard, TipCard, NotificationCard, Panel, Modal, View, AddressSectionCard}  from '@citadeldao/apps-ui-kit/dist/main';
import InfoPanel from './components/panels/InfoPanel'
import { Config } from './components/config/config';
import SelectAddressPanel from './components/panels/SelectAddressPanel';
import SelectTokenPanel from './components/panels/SelectTokenPanel';
import { formatByDecimals } from './components/helpers/numberFormatter';
const MainView = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const { rate, routes, tokenIn, tokenOut, amount, outAmout } = useSelector(state => state.swap)
    const showModal = useSelector(state => state.errors.openErrorModal)
    const showConfirmModal = useSelector(state => state.errors.openConfirmModal)
    const {validationErrors, errors} = useSelector(state => state.errors)
    const {activeWallet} = useSelector(state => state.wallet)
    const [showSuccess, setShowSuccess] = useState(errors)
    useEffect(() => {
      setShowSuccess(errors)
      console.log(window.location.pathname)
      if(window.location.pathname.includes('/info/')){
        navigate(window.location.pathname)
      }
    }, [errors]);
    const clearErrors = () => {
      setShowSuccess(false)
      dispatch(errorActions.clearErrors())
    }
    const navigate = useNavigate()
    let wallet = activeWallet
    if(activeWallet){
      wallet = {...activeWallet,balance: formatByDecimals(activeWallet?.balance,6)}
    }
    const config = new Config()
    const [disabledSwap, setDisabledSwap] = useState(true)
    return(
        <View>
            <Panel config={config}>
              <AddressSectionCard onClick={() => navigate(ROUTES.SELECT_ADDRESS)} style={{margin: '20px 20px 0'}} data={wallet} id='/show'></AddressSectionCard>
              <PopupWindow show={showSuccess} id='/show'>
                  <StatusPopup text={errors?.text} type='error' showPopup={clearErrors}/>       
              </PopupWindow>
              <SwapPanel id={ROUTES.SWAP} />
              <PoolsPanel id={ROUTES.POOLS} />
              <AddPoolPanel id={ROUTES.ADD_POOL} />
              <TransactionsPanel id={ROUTES.TRANSACTIONS} />
              <GuidesPanel id={ROUTES.INFO_MENU_GUIDE} />
              <SelectAddressPanel id={ROUTES.SELECT_ADDRESS} />
              <SelectTokenPanel id={ROUTES.SELECT_TOKEN} />
              <TransactionsDetailsPanel id={ROUTES.TRANSACTION_DETAILS} />
            </Panel>
            <InfoPanel config={config}/>
            <Modal show={showModal && !location.pathname.includes('/info')}>
              { validationErrors?.text && <div>
                <NotificationCard text={text.ADDRESS_ERROR_HEADER} iconColor="#00B2FE" boldText/>
                <p className='description-text'>{text.ADDRESS_ERROR_DESCRIPTION}</p>
                <TipCard text={text.ADDRESS_ERROR_TIP} />
              </div> }
            </Modal>
            <Modal show={showConfirmModal && !location.pathname.includes('/info')} showModal={() => dispatch(errorActions.setConfirmModal(false))}>
              <div className='modal-header row'>
                <h4>Confirm swap</h4>
                <CustomIcon icon='close-modal' onClick={() => dispatch(errorActions.setConfirmModal(false))}/>
              </div>
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
        </View>
    )
}

export default MainView