import React, {useState,useEffect} from 'react'
import './components/styles/panels/index.css'
import GuidesPanel from './components/panels/GuidesPanel'
import ROUTES from "./routes";
import MainPanel from '@citadeldao/apps-ui-kit/dist/components/uiKit/Panel'
import AddressListPanel from './components/panels/AddressListPanel'
import TransactionsPanel from './components/panels/TransactionsPanel'
import TransactionsDetailsPanel from './components/panels/TransactionDetails'
import { useLocation } from 'react-router-dom'
import Modal from '@citadeldao/apps-ui-kit/dist/components/uiKit/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { errorActions } from './store/actions'
import NotificationCard from '@citadeldao/apps-ui-kit/dist/components/uiKit/NotificationCard'
import TipCard from '@citadeldao/apps-ui-kit/dist/components/uiKit/TipCard';
import text from './text.json'
import View from '@citadeldao/apps-ui-kit/dist/components/uiKit/View'
import StatusPopup from '@citadeldao/apps-ui-kit/dist/components/uiKit/StatusPopup';
import InfoPanel from './components/panels/InfoPanel'
import PopupWindow from '@citadeldao/apps-ui-kit/dist/components/uiKit/PopupWindow'
const MainView = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const showModal = useSelector(state => state.errors.openErrorModal)
    const {validationErrors, errors} = useSelector(state => state.errors)
    const [showSuccess, setShowSuccess] = useState(errors)
    useEffect(() => {
      setShowSuccess(errors)
    }, [errors]);
    const clearErrors = () => {
      setShowSuccess(false)
      dispatch(errorActions.clearErrors())
    }
    return(
        <View>
            <MainPanel>
              <PopupWindow show={showSuccess} id='/'>
                  <StatusPopup text={errors?.text} type='error' showPopup={clearErrors}/>       
              </PopupWindow>
              <AddressListPanel id={ROUTES.ADDRESS_LIST} />
              <TransactionsPanel id={ROUTES.TRANSACTIONS} />
              <GuidesPanel id={ROUTES.INFO_MENU_GUIDE} />
              <TransactionsDetailsPanel id={ROUTES.TRANSACTION_DETAILS} />
            </MainPanel>
            <InfoPanel/>
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