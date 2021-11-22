import { Group, Div,Button } from '@vkontakte/vkui';
import Header from '../uikit/Header'
import {connect} from 'react-redux';
import '../styles/panels/settings.css'
import {  useState } from 'react';
import {setSlippageTolerance,setDeadline} from '../../store/actions/swapActions'
import fileRoutes from '../../config/file-routes-config.json'
import text from '../../text.json'
 const Settings = (props) => {
    const [minute,setMinute] = useState(0)
    const [procentWidth,setProcentWidth] = useState(-55)
    const [minuteWidth,setMinuteWidth] = useState(-330)
    const [deadlineInputId,setDeadlineInputId] = useState('default-input')
    const [inputId,setInputId] = useState('default-input')
    const {slippageTolerance,deadlineMin} = props.swapReducer
    const [currentProcent,setCurrentProcent] = useState(slippageTolerance)
    const procent = [1,3,5]
    const [IDname,setIDname] = useState('initial-procent')
    const [activeOption,setActiveOption] = useState(false)
    const save = () => {
        props.setDeadline(+minute)
        props.setSlippageTolerance(+currentProcent);
        setIDname('initial-procent')
        setInputId('default-procent');
        setDeadlineInputId('default-input');
    }
    const setSlippageProcent = (val) => {
        setCurrentProcent(val);
        setProcentWidth(-60 + ((val.length +1) * 7))
    }
    const setDeadline = (val) => {
        setMinute(val);
        setMinuteWidth(-350 + ((val.length + 1) * 7));
        setActiveOption(false)
    }
    const activeProcent = (item) => {
        setCurrentProcent(item)
        setIDname('active-procent')
        setInputId('default-input')
        setDeadlineInputId('default-input');
    }
    const setProcentActive = () => {
        setInputId('active-procent');
        setDeadlineInputId('default-input');
        setCurrentProcent(0)
    }
    const setDeadlineActive = () => {
        setDeadlineInputId('active-procent');
        setInputId('default-procent');
        setActiveOption(false)
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
                        <button key={item} id={currentProcent === item ? IDname : undefined} className='procent-btn' onClick={() => activeProcent(item) }>{item} <span>%</span></button>
                    ))}
                    <input value={currentProcent} id={inputId} onClick={() => setProcentActive()} className='procent-input' onChange={(e) => setSlippageProcent(e.target.value)}></input>
                    <span className='procent-span' style={{left: `${procentWidth}px`}}>%</span>
                </div>
            </Div>
            <Div>
                <h4>{text.DEADLINE_TEXT}</h4>
                <div className='procent-row'>
                    <button id={activeOption ? 'active-procent' : undefined} className='procent-btn' onClick={() => {setMinute(deadlineMin);setActiveOption(true)}}>{deadlineMin} min</button>
                    <input className='deadline-input' onClick={() => setDeadlineActive()} id={deadlineInputId} value={minute} onChange={(e) => setDeadline(e.target.value)}/>
                    <span className='minute-span' style={{left: `${minuteWidth}px`}}>min</span>
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
