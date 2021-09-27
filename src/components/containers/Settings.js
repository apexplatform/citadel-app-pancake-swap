import { Group } from '@vkontakte/vkui';
import Header from '../uikit/Header'
import {connect} from 'react-redux';
import {prepareClaimRewards} from '../../store/actions/rewardsActions'
import '../styles/panels/settings.css'
import { useEffect } from 'react';
const Settings = (props) => {
    useEffect(()=>{
        props.prepareClaimRewards()
    },[])
    return(
        <Group className='settings-panel'>
            <Header title="Settings" />
            <p>Settings page</p>
        </Group>
    )
}

const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer
})

export default connect(mapStateToProps, {prepareClaimRewards}) (Settings);
