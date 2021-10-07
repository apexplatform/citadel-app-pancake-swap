import { Group, Div,Button } from '@vkontakte/vkui';
import Header from '../uikit/Header'
import {connect} from 'react-redux';
import {prepareClaimRewards} from '../../store/actions/rewardsActions'
import '../styles/panels/settings.css'
import { useEffect } from 'react';
import {setSlippageTolerance} from '../../store/actions/swapActions'
import fileRoutes from '../../config/file-routes-config.json'
import text from '../../text.json'
 const Settings = (props) => {
    useEffect(()=>{
        props.prepareClaimRewards()
    },[])
    const {slippageTolerance} = props.swapReducer
    const procent = [1,3,5,20]
    return(
        <Group className='settings-panel'>
            <Header title="Settings" />
            <Div>
                <h4>Lorem ipsum</h4>
                <p>The Cosmos Hub (ATOM) community is requesting a community pool spend amount of 129,208 ATOM in order to implement a comprehensive ATOM marketing</p>
            </Div>
            <Div className='add-address-btn' onClick={() => changePanel()}>
                <img src={fileRoutes.ADD_ICON} alt='add' /> 
                <p>{text.ADD_ADDRESS}</p>
            </Div>
            <Div>
                <h4>{text.SLIPPAGE_TOLERANCE}</h4>
                <div className='procent-row'>
                    {procent.map((item) => (
                        <button id={slippageTolerance === item ? 'active-procent' : undefined} className='procent-btn' onClick={() => props.setSlippageTolerance(item)}>{item} <span>%</span></button>
                    ))}
                </div>
            </Div>
            <Div>
				<Button stretched size="l" className='swap-btn'>
					Save
				</Button>
			</Div>
        </Group>
    )
}

const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer,
    swapReducer: state.swapReducer
})

export default connect(mapStateToProps, {setSlippageTolerance,prepareClaimRewards}) (Settings);
