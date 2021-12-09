import { Group, Div,Button } from '@vkontakte/vkui';
import Header from '../uikit/Header'
import {setActivePanel} from '../../store/actions/panelActions'
import {connect} from 'react-redux';
import '../styles/panels/settings.css'
import { useState,useEffect } from 'react';
import {setSlippageTolerance,setDeadline} from '../../store/actions/swapActions'
import fileRoutes from '../../config/file-routes-config.json'
import text from '../../text.json'
import BigNumber from 'bignumber.js';
import InputNumber from '../uikit/InputNumber'
 const Settings = (props) => {
    const {previousPanel} = props.panelReducer
    const {slippageTolerance,deadlineMin} = props.swapReducer
    const [minute,setMinute] = useState(deadlineMin)
    const [minute2,setMinute2] = useState(deadlineMin)
    const [deadlineInputId,setDeadlineInputId] = useState('default-input')
    const [inputId,setInputId] = useState('default-input')
    const [currentProcent,setCurrentProcent] = useState(slippageTolerance)
    const [isButtonOption, setButtonOption] = useState(true)
    const [isButtonOption2, setButtonOption2] = useState(true)
    const [currentProcent2,setCurrentProcent2] = useState(slippageTolerance)
    const procent = [1,3,5]
    const [IDname,setIDname] = useState('initial-procent')
    const [activeOption,setActiveOption] = useState(false)
    const save = () => {
        if(minute) {
            isButtonOption2 ? props.setDeadline(+minute2) : props.setDeadline(+minute)
        } else {
            setMinute(0)
            props.setDeadline(0)
        }
        if(currentProcent) {
            isButtonOption ? props.setSlippageTolerance(+currentProcent2) : props.setSlippageTolerance(+currentProcent)
        }else{
            setCurrentProcent(0)
            props.setSlippageTolerance(0)
        }
        setActiveOption(false)
        setIDname('initial-procent')
        props.setActivePanel(previousPanel)
    }
    const setSlippageProcent = (val) => {
        val = val.replace(/[^0-9\.]/g, '')
        if(val[0] == '0' && val[1] != '.'){
            setCurrentProcent(BigNumber(+val).toFixed());
        } else {
            setCurrentProcent(val);   
        }
        setButtonOption(false)
    }
    const setDeadline = (val) => {
        val = val.replace(/[^0-9\.]/g, '')
        if(val[0] == '0' && val[1] != '.' ){
            setMinute(BigNumber(val).toFixed());
        } else {
            setMinute(val);
        }
        setButtonOption2(false)
        setActiveOption(false)
    }
    const activeProcent = (item) => {
        setCurrentProcent2(item)
        setButtonOption(true)
        setIDname('active-procent')
        setInputId('default-input')
    }
    const setProcentActive = () => {
        setInputId('active-input');
        setCurrentProcent2(0)
    }
    const setDeadlineActive = () => {
        setDeadlineInputId('active-input');
        setActiveOption(false)
    }
    const setDeadlineButtonActive = () => {
        setMinute2(20);
        setDeadlineInputId('default-input');
        setActiveOption(true)
        setButtonOption2(true)
    }
    useEffect(() => {
        let flag = false
        procent.map(el => {
            if(el == slippageTolerance){
                flag = true
            }
        })
        if(!flag){
            setInputId('active-input-2')
        } else {
            setInputId('default-input');
        }
        if(deadlineMin != 20){
            setDeadlineInputId('active-input-2')
        }
    }, [])
    
    return(
        <Group className='settings-panel'>
            <Header title="Settings" showTitle={true}/>
            <Div className='manage-address-text'>
                <h4>{text.SETTING_TITLE}</h4>
                <p>{text.SETTING_DESCRIPTION} </p>
            </Div>
            <Div className='add-address-btn'>
                <img src={fileRoutes.ADD_ICON} alt='add' /> 
                <p>{text.ADD_ADDRESS}</p>
            </Div>
            <Div className='coming-soon'>
                <h2>{text.COMING_SOON}</h2>
            </Div>
            <Div>
                <h4>{text.SLIPPAGE_TOLERANCE}</h4>
                <div className='procent-row'>
                    {procent.map((item) => (
                        <button key={item} id={currentProcent2 === item ? IDname : undefined} className='procent-btn' onClick={() => activeProcent(item) }>{item} <span>%</span></button>
                    ))}
                    <InputNumber symbol='%' width='23%' value={currentProcent} idValue={inputId} setActive={setProcentActive} setInputId={setInputId} setValue={setSlippageProcent}/>
                </div>
            </Div>
            <Div>
                <h4>{text.DEADLINE_TEXT}</h4>
                <div className='procent-row-2'>
                    <button id={activeOption ? 'active-procent' : +deadlineMin == 20 ? 'initial-procent' : undefined} className='procent-btn' onClick={() => setDeadlineButtonActive()}>20 min</button>
                    <InputNumber symbol='min' width='29%' value={minute} idValue={deadlineInputId} setActive={setDeadlineActive} setInputId={setDeadlineInputId} setValue={setDeadline}/>
                </div>
            </Div>
            <Div>
                <Button stretched size="l" onClick={() => save()} className='save-btn'>
                    Save
                </Button>
            </Div>
        </Group>
    )
}

const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer,
    swapReducer: state.swapReducer,
    panelReducer: state.panelReducer
})

export default connect(mapStateToProps, {setActivePanel,setDeadline,setSlippageTolerance}) (Settings);
