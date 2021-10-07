import '../styles/components/tabbar.css'
import {setActivePanel} from '../../store/actions/panelActions'
import {connect} from 'react-redux';
import { Config } from '../../config/config';
import Icon from './Icon'
import { useEffect, useState } from 'react';
const TabbarItem = (props) => {
    const {activePanel} = props.panelReducer
    const config = new Config()
    const [itemColor,setItemColor] = useState(config.tabbarParamsFromConfig('DEFAULT_ITEM_COLOR'))
    useEffect(()=>{
        if(activePanel === props.routes){
            setItemColor(config.tabbarParamsFromConfig('ACTIVE_ITEM_COLOR'))
        }
    },[])
    const changePanel = () => {
        props.setActivePanel(props.routes)
        if(activePanel === props.routes){
            setItemColor(config.tabbarParamsFromConfig('ACTIVE_ITEM_COLOR'))
        }
    }
    const setHoverColor = () => {
        setItemColor(config.tabbarParamsFromConfig('HOVER_ITEM_COLOR'))
    }
    const setDefaultColor = () => {
        if(activePanel !== props.routes){
            setItemColor(config.tabbarParamsFromConfig('DEFAULT_ITEM_COLOR'))
        }
    }
    return(
        <div className='tabbar-item' onClick={() => changePanel()} onMouseOver={()=> setHoverColor()} onMouseLeave={() => setDefaultColor()}>
            <Icon width={30} height={30} fill={itemColor} icon={props.icon}/>
            <p style={{color: itemColor }}>{props.title}</p>
        </div>
    )
}

const mapStateToProps=(state)=>({
	panelReducer: state.panelReducer
})

export default connect(mapStateToProps, {setActivePanel}) (TabbarItem);
