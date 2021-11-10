import { Group, Div,Button } from '@vkontakte/vkui';
import Header from '../uikit/Header'
import {connect} from 'react-redux';
import '../styles/panels/settings.css'
import {  useState } from 'react';
import {setSlippageTolerance,setDeadline} from '../../store/actions/swapActions'
import fileRoutes from '../../config/file-routes-config.json'
import text from '../../text.json'
 const Settings = (props) => {
    const [minute,setMinute] = useState('')
    const {slippageTolerance,deadlineMin} = props.swapReducer
    const [currentProcent,setCurrentProcent] = useState(slippageTolerance)
    const procent = [1,3,5]
    const [IDname,setIDname] = useState('initial-procent')
    const save = () => {
        props.setDeadline(minute)
        props.setSlippageTolerance(currentProcent);
        setIDname('initial-procent')
    }
    return(
        <Group className='settings-panel'>
            <Header title="Settings" showTitle={true}/>
            <Div>
                <h4>{text.SETTING_TITLE}</h4>
                <p>{text.SETTING_DESCRIPTION} </p>
            </Div>
            <Div className='add-address-btn'>
                <img src={fileRoutes.ADD_ICON} alt='add' /> 
                <p>{text.ADD_ADDRESS}</p>
            </Div>
            <Div>
                <h4>{text.SLIPPAGE_TOLERANCE}</h4>
                <div className='procent-row'>
                    {procent.map((item) => (
                        <button key={item} id={+currentProcent === +item ? IDname : undefined} className='procent-btn' onClick={() => { setCurrentProcent(item);setIDname('active-procent')}}>{item} <span>%</span></button>
                    ))}
                    <input value={currentProcent} className='procent-input' onChange={(e) => { setCurrentProcent(+e.target.value)}}></input>
                </div>
            </Div>
            <Div>
                <h4>{text.DEADLINE_TEXT}</h4>
                <div className='procent-row'>
                    <button className='procent-btn' onClick={() => setMinute(deadlineMin)}>{deadlineMin} min</button>
                    <input className='deadline-input' type='number' value={minute} onChange={(e) => setMinute(+e.target.value)}/>
                </div>
            </Div>
            <Button stretched size="l" onClick={() => save()} className='save-btn'>
                Save
            </Button>
        </Group>
    )
}

const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer,
    swapReducer: state.swapReducer
})

export default connect(mapStateToProps, {setDeadline,setSlippageTolerance}) (Settings);
