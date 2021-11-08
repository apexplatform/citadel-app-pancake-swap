import ROUTES from './routes'
import Swap from './components/containers/Swap'
import Transactions from './components/containers/Transactions'
import { View,Group,Panel,ModalRoot,ModalPage,ModalPageHeader } from '@vkontakte/vkui';
import {setActivePanel,setActiveModal} from './store/actions/panelActions'
import {connect} from 'react-redux';
import Tabbar from './components/uikit/Tabbar'
import AddressBlock from './components/uikit/AddressBlock'
import { Config } from './config/config'
import Settings from './components/containers/Settings'

const MainPanel = (props) => {
    const {activePanel,activeModal} = props.panelReducer
    const config = new Config()
    const {networkErrors} = props.errorsReducer
    const modal = (
		<ModalRoot activeModal={activeModal}>
		  <ModalPage id="errors"   dynamicContentHeight onClose={() => props.setActiveModal(null)}    header={
            <ModalPageHeader>
              Error!
            </ModalPageHeader>
          }>
			<p className='error-text'>{networkErrors}</p>
		  </ModalPage>
		</ModalRoot>
	  );
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
    errorsReducer: state.errorsReducer
})

export default connect(mapStateToProps, {setActiveModal,setActivePanel}) (MainPanel);
