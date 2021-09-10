import { Group } from '@vkontakte/vkui';
import Header from '../components/Header'
import {connect} from 'react-redux';
import '../styles/panels/settings.css'
const Settings = (props) => {
    
    return(
        <Group className='settings-panel'>
            <Header title="Settings" />
            <p>Settings page</p>
        </Group>
    )
}

const mapStateToProps=(state)=>({
	panelReducer: state.panelReducer
})

export default connect(mapStateToProps, {}) (Settings);
