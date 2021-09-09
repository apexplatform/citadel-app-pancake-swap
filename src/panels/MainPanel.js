import ROUTES from '../routes'
import Bridge from '../containers/Bridge'
import Transactions from '../containers/Transactions'
import { View,Group,Panel } from '@vkontakte/vkui';
import {setActivePanel} from '../store/actions/panelActions'
import {connect} from 'react-redux';
import Tabbar from '../components/Tabbar'
import AddressBlock from '../components/AddressBlock'
import { Config } from '../config/config'
import Settings from '../containers/Settings'
const MainPanel = (props) => {
    const {activePanel} = props.panelReducer
    const config = new Config()
    return(
        <Panel id={ROUTES.HOME}>
            <Group>
                <View activePanel={activePanel}>
                    <Panel id={ROUTES.POOL}>
                        <Bridge/>
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
