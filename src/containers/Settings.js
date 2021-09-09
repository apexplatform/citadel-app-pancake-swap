import ROUTES from '../routes'
import { Group } from '@vkontakte/vkui';
import Header from '../components/Header'
import {connect} from 'react-redux';
import Tabbar from '../components/Tabbar'
const Settings = (props) => {
    
    return(
        <Group>
            <Header title="Setting" />
            <p>Setting page</p>
        </Group>
    )
}

const mapStateToProps=(state)=>({
	panelReducer: state.panelReducer
})

export default connect(mapStateToProps, {}) (Settings);
