import { Group, Div,Button } from '@vkontakte/vkui';
import Header from '../uikit/Header'
import {connect} from 'react-redux';
import '../styles/panels/settings.css'
import { useState,useEffect } from 'react';
import {setSlippageTolerance,setDeadline} from '../../store/actions/swapActions'
import fileRoutes from '../../config/file-routes-config.json'
import text from '../../text.json'
import BigNumber from 'bignumber.js';
 const Settings = (props) => {
    const {slippageTolerance,deadlineMin} = props.swapReducer
    const [minute,setMinute] = useState(deadlineMin)
    const [procentWidth,setProcentWidth] = useState(-60 + ((slippageTolerance.toString().length +1) * 7))
    const [minuteWidth,setMinuteWidth] = useState(-355 + ((deadlineMin.toString().length + 1) * 7))
    const [deadlineInputId,setDeadlineInputId] = useState('default-input')
    const [inputId,setInputId] = useState('default-input')
    const [currentProcent,setCurrentProcent] = useState(slippageTolerance)
    const procent = [1,3,5]
    const [IDname,setIDname] = useState('initial-procent')
    const [activeOption,setActiveOption] = useState(false)
    const save = () => {
        if(minute) {
            props.setDeadline(+minute)
        } else {
            setMinute(0)
            props.setDeadline(0)
        }
        if(currentProcent) {
            props.setSlippageTolerance(+currentProcent)
        }else{
            setCurrentProcent(0)
            props.setSlippageTolerance(0)
        }
        setIDname('initial-procent')
    }
    const setSlippageProcent = (val) => {
        val = val.replace(/[^\d]/g, '')
        setCurrentProcent(val ? BigNumber(val).toFixed() : '');
        setProcentWidth(-65 + ((val.length +1) * 7))
    }
    const setDeadline = (val) => {
        val = val.replace(/[^\d]/g, '')
        setMinute(val ? BigNumber(val).toFixed() : '');
        setMinuteWidth(-345 + ((val.length + 1) * 7));
        setActiveOption(false)
    }
    const activeProcent = (item) => {
        setCurrentProcent(item)
        setIDname('active-procent')
        setInputId('default-input')
    }
    const setProcentActive = () => {
        setInputId('active-input');
        setCurrentProcent(0)
    }
    const setDeadlineActive = () => {
        setDeadlineInputId('active-input');
        setActiveOption(false)
    }
    const setDeadlineButtonActive = () => {
        setMinute(20);
        setDeadlineInputId('default-input');
        setActiveOption(true)
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
                        <button key={item} id={currentProcent === item ? IDname : undefined} className='procent-btn' onClick={() => activeProcent(item) }>{item} <span>%</span></button>
                    ))}
                    <input pattern="[0-9.]+" value={currentProcent} type='text' onBlur={() => setInputId('active-input-2')} id={inputId} onClick={() => setProcentActive()} className='procent-input' onChange={(e) => setSlippageProcent(e.target.value)}></input>
                    <span className='procent-span' style={{left: `${procentWidth}px`}}>%</span>
                </div>
            </Div>
            <Div>
                <h4>{text.DEADLINE_TEXT}</h4>
                <div className='procent-row'>
                    <button id={activeOption ? 'active-procent' : +deadlineMin == 20 ? 'initial-procent' : undefined} className='procent-btn' onClick={() => setDeadlineButtonActive()}>20 min</button>
                    <input className='deadline-input' pattern="[0-9.]+" onBlur={() => setDeadlineInputId('active-input-2')} onClick={() => setDeadlineActive()} id={deadlineInputId} value={minute} onChange={(e) => setDeadline(e.target.value)}/>
                    <span className='minute-span' style={{left: `${minuteWidth}px`}}>min</span>
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
    swapReducer: state.swapReducer
})

export default connect(mapStateToProps, {setDeadline,setSlippageTolerance}) (Settings);
