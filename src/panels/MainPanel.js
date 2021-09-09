import ROUTES from '../routes'
import Bridge from '../containers/Bridge'
import Transactions from '../containers/Transactions'
import { View,Group,Panel } from '@vkontakte/vkui';
import {setActivePanel} from '../store/actions/panelActions'
import {connect} from 'react-redux';
import Tabbar from '../components/Tabbar'
import Header from '../components/Header'
import AddressBlock from '../components/AddressBlock'
const MainPanel = (props) => {
    const {activePanel} = props.panelReducer
    return(
        <Panel id={ROUTES.HOME}>
            <Header title='Bridge'></Header>
            <Group>
                <View activePanel={activePanel}>
                    <Panel id={ROUTES.POOL}>
                        <Bridge/>
                        <AddressBlock />
                        <Tabbar/>
                    </Panel>
                    <Panel id={ROUTES.TRANSACTIONS}>
                        <Transactions/>
                        <AddressBlock />
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
