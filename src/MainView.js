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
import { StatusPopup, PopupWindow , TipCard, NotificationCard, Panel, Modal, View, AddressSectionCard}  from '@citadeldao/apps-ui-kit/dist/main';
import InfoPanel from './components/panels/InfoPanel'
import { Config } from './components/config/config';
import SelectAddressPanel from './components/panels/SelectAddressPanel';
import SelectTokenPanel from './components/panels/SelectTokenPanel';
const MainView = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const showModal = useSelector(state => state.errors.openErrorModal)
    const {validationErrors, errors} = useSelector(state => state.errors)
    const {activeWallet} = useSelector(state => state.wallet)
    const [showSuccess, setShowSuccess] = useState(errors)
    useEffect(() => {
      setShowSuccess(errors)
    }, [errors]);
    const clearErrors = () => {
      setShowSuccess(false)
      dispatch(errorActions.clearErrors())
    }
    const navigate = useNavigate()
    const config = new Config()
    console.log(errors,'--errors')
    return(
        <View>
            <Panel config={config}>
              <AddressSectionCard onClick={() => navigate(ROUTES.SELECT_ADDRESS + '?' + window.location.search.slice(1))} style={{margin: '20px 20px 0'}} data={activeWallet} id='/show'></AddressSectionCard>
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
        </View>
    )
}

export default MainView