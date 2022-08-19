import React, {useState,useEffect} from 'react'
import './components/styles/panels/index.css'
import GuidesPanel from './components/panels/GuidesPanel'
import ROUTES from "./routes";
import SwapPanel from './components/panels/SwapPanel'
import TransactionsPanel from './components/panels/TransactionsPanel'
import SelectTokenPanel from './components/panels/SelectTokenPanel'
import TransactionsDetailsPanel from './components/panels/TransactionDetails'
import { useDispatch, useSelector } from 'react-redux'
import { errorActions, swapActions } from './store/actions'
import text from './text.json'
import { useNavigate, useLocation } from 'react-router-dom';
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
    const { borderRadius } = useSelector(state => state.panels)
    const [showSuccess, setShowSuccess] = useState(errors)
    useEffect(() => {
      setShowSuccess(errors)
      dispatch(swapActions.checkSwapStatus(amount))
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
            <Panel config={config} style={{borderRadius: `${borderRadius}px`}}>
              <AddressSectionCard onClick={() => navigate(ROUTES.SELECT_ADDRESS)} className='select-address-card' data={wallet} id='/show'></AddressSectionCard>
              <PopupWindow show={showSuccess} id='/show'>
                  <StatusPopup text={errors?.text} type='error' showPopup={clearErrors}/>       
              </PopupWindow>
              <SwapPanel id={ROUTES.SWAP} />
              <TransactionsPanel id={ROUTES.TRANSACTIONS} />
              <GuidesPanel id={ROUTES.INFO_MENU_GUIDE} />
              <SelectAddressPanel id={ROUTES.SELECT_ADDRESS} />
              <SelectTokenPanel id={ROUTES.SELECT_TOKEN} />
              <TransactionsDetailsPanel id={ROUTES.TRANSACTION_DETAILS} />
              <Modal id={ROUTES.SWAP} show={showModal && !location.pathname.includes('/info')} borderRadius={borderRadius}>
                { validationErrors?.text && <div>
                  <NotificationCard text={text.ADDRESS_ERROR_HEADER} iconColor="#00B2FE" boldText/>
                  <p className='description-text'>{text.ADDRESS_ERROR_DESCRIPTION}</p>
                  <TipCard text={text.ADDRESS_ERROR_TIP} />
                </div> }
              </Modal>
            </Panel>
            <InfoPanel config={config}/>
        </View>
    );
};

export default MainView;