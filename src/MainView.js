import React, {useState,useEffect} from 'react'
import './components/styles/panels/index.css'
import GuidesPanel from './components/panels/GuidesPanel'
import ROUTES from "./routes";
import SwapPanel from './components/panels/SwapPanel'
import TransactionsPanel from './components/panels/TransactionsPanel'
import SelectTokenPanel from './components/panels/SelectTokenPanel'
import TransactionsDetailsPanel from './components/panels/TransactionDetails'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { errorActions, swapActions } from './store/actions'
import text from './text.json'
import { useNavigate } from 'react-router-dom';
import { StatusPopup, PopupWindow, TipCard, NotificationCard, Panel, Modal, View, AddressSectionCard}  from '@citadeldao/apps-ui-kit/dist/main';
import InfoPanel from './components/panels/InfoPanel'
import { Config } from './components/config/config';
import SelectAddressPanel from './components/panels/SelectAddressPanel';
import { prettyNumber } from './components/helpers/numberFormatter';
const MainView = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const showModal = useSelector(state => state.errors.openErrorModal)
    const { validationErrors, errors } = useSelector(state => state.errors)
    const { activeWallet, allowance } = useSelector(state => state.wallet)
    const { amount, tokenIn } = useSelector(state => state.swap)
    const [showSuccess, setShowSuccess] = useState(errors)
    useEffect(() => {
      setShowSuccess(errors)
      dispatch(swapActions.checkSwapStatus(amount))
      if(window.location.pathname.includes('/info/')){
        navigate(window.location.pathname)
      }
      // eslint-disable-next-line 
    }, [errors,allowance,tokenIn]);
    const clearErrors = () => {
        setShowSuccess(false);
        dispatch(errorActions.clearErrors());
    };
    const navigate = useNavigate();
    let wallet = activeWallet;

    if (activeWallet) {
      wallet = {...activeWallet,balance: prettyNumber(activeWallet?.balance)}
    }
    const config = new Config()
    return(
        <View>
            <Panel config={config}>
              <AddressSectionCard onClick={() => navigate(ROUTES.SELECT_ADDRESS)} style={{margin: '20px 20px 0'}} data={wallet} id='/show'></AddressSectionCard>
              <PopupWindow show={showSuccess} id='/show'>
                  <StatusPopup text={errors?.text} type='error' showPopup={clearErrors}/>       
              </PopupWindow>
              <SwapPanel id={ROUTES.SWAP} />
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
    );
};

export default MainView;