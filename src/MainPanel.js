import ROUTES from './routes'
import Swap from './components/containers/Swap'
import Transactions from './components/containers/Transactions'
import { View,Group,Panel,ModalRoot} from '@vkontakte/vkui';
import {setActivePanel,setActiveModal} from './store/actions/panelActions'
import {connect} from 'react-redux';
import Tabbar from './components/uikit/Tabbar'
import AddressBlock from './components/uikit/AddressBlock'
import { Config } from './config/config'
import Settings from './components/containers/Settings'
import ErrorModal from './components/uikit/ErrorModal'
import ConfirmModal from './components/uikit/ConfirmModal'
import { useEffect } from "react";

const MainPanel = (props) => {
    const {activePanel,activeModal} = props.panelReducer
    const config = new Config()
    const modal = <ModalRoot activeModal={activeModal}>
                    <ErrorModal id="errors"/>
                    <ConfirmModal id="confirm"/>
                  </ModalRoot>
    const { swapInfo } = props.swapReducer
        useEffect(() => {
        window.addEventListener("message", (event) => {
        //   if (event.origin !== "https://localhost:10889") return;
            if(event.data == 'getSwapInfo'){
            event.source.postMessage(swapInfo, event.origin);
            }
        }, false);
    },[swapInfo])
    return(
        <Panel id={ROUTES.HOME}>
            <Group>
                <View activePanel={activePanel} modal={modal}>
                    <Panel id={ROUTES.SWAP}>
                        <Swap/>
                        {config.showAddressBlock && <AddressBlock />}
                        <Tabbar/>
                    </Panel>
                    <Panel id={ROUTES.TRANSACTIONS}>
                        <Transactions/>
                        {config.showAddressBlock && <AddressBlock />}
                        <Tabbar/>
                    </Panel>
                    <Panel id={ROUTES.SETTINGS}>
                        <Settings/>
                        <Tabbar/>
                    </Panel>
                </View>
            </Group>
        </Panel>
    )
}

const mapStateToProps=(state)=>({
	panelReducer: state.panelReducer,
    swapReducer: state.swapReducer
})

export default connect(mapStateToProps, {setActiveModal,setActivePanel}) (MainPanel);
