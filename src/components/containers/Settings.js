import { Group, Div,Button } from '@vkontakte/vkui';
import Header from '../uikit/Header'
import {connect} from 'react-redux';
import {prepareClaimRewards} from '../../store/actions/rewardsActions'
import '../styles/panels/settings.css'
import { useEffect, useState } from 'react';
import {setSlippageTolerance,setDeadline} from '../../store/actions/swapActions'
import fileRoutes from '../../config/file-routes-config.json'
import text from '../../text.json'
 const Settings = (props) => {
    useEffect(()=>{
        props.prepareClaimRewards()
    },[])
    const [minute,setMinute] = useState(0)
    const {slippageTolerance} = props.swapReducer
    const procent = [1,3,5,20]
    return(
        <Group className='settings-panel'>
            <Header title="Settings" showTitle={true}/>
            <Div>
                <h4>{text.SETTING_TITLE}</h4>
                <p>{text.SETTING_DESCRIPTION} </p>
            </Div>
            <Div className='add-address-btn' onClick={() => changePanel()}>
                <img src={fileRoutes.ADD_ICON} alt='add' /> 
                <p>{text.ADD_ADDRESS}</p>
            </Div>
            <Div>
                <h4>{text.SLIPPAGE_TOLERANCE}</h4>
                <div className='procent-row'>
                    {procent.map((item) => (
                        <button key={item} id={slippageTolerance === item ? 'active-procent' : undefined} className='procent-btn' onClick={() => props.setSlippageTolerance(item)}>{item} <span>%</span></button>
                    ))}
                </div>
            </Div>
            <Div>
                <h4>{text.DEADLINE_TEXT}</h4>
                <div className='procent-row'>
                    <button className='procent-btn' onClick={() => setMinute(20)}>20 min</button>
                    <input className='deadline-input' type='number' value={minute} onChange={(e) => setMinute(e.target.value)}/>
                </div>
            </Div>
            <Button stretched size="l" onClick={() => setDeadline(minute)} className='save-btn'>
                Save
            </Button>
        </Group>
    )
}

const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer,
    swapReducer: state.swapReducer
})

export default connect(mapStateToProps, {setDeadline,setSlippageTolerance,prepareClaimRewards}) (Settings);
