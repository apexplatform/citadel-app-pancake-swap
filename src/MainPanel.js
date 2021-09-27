import ROUTES from './routes'
import Swap from './components/containers/Swap'
import Transactions from './components/containers/Transactions'
import { View,Group,Panel } from '@vkontakte/vkui';
import {setActivePanel} from './store/actions/panelActions'
import {connect} from 'react-redux';
import Tabbar from './components/uikit/Tabbar'
import AddressBlock from './components/uikit/AddressBlock'
import { Config } from './config/config'
import Settings from './components/containers/Settings'
const MainPanel = (props) => {
    const {activePanel} = props.panelReducer
    const config = new Config()
    return(
        <Panel id={ROUTES.HOME}>
            <Group>
                <View activePanel={activePanel}>
                    <Panel id={ROUTES.SEND}>
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
	panelReducer: state.panelReducer
})

export default connect(mapStateToProps, {setActivePanel}) (MainPanel);
