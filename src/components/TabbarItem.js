import '../styles/components/tabbar.css'
import {setActivePanel} from '../store/actions/panelActions'
import {connect} from 'react-redux';
import { Config } from '../config/config';
import Icon from './Icon'
import { useEffect, useState } from 'react';
const TabbarItem = (props) => {
    const {activePanel} = props.panelReducer
    const config = new Config()
    const [itemColor,setItemColor] = useState(config.tabbarItemColor)
    useEffect(()=>{
        if(activePanel === props.routes){
            setItemColor(config.tabbarActiveItemColor)
        }
    },[])
    const changePanel = () => {
        props.setActivePanel(props.routes)
        if(activePanel === props.routes){
            setItemColor(config.tabbarActiveItemColor)
        }
    }
    const setHoverColor = () => {
        setItemColor(config.tabbarItemHoverColor)
    }
    const setDefaultColor = () => {
        if(activePanel !== props.routes){
            setItemColor(config.tabbarItemColor)
        }
    }
    return(
        <div className='tabbar-item' onClick={() => changePanel()} onMouseOver={()=> setHoverColor()} onMouseLeave={() => setDefaultColor()}>
            <Icon width={30} height={30} fill={itemColor} icon={props.title}/>
            <p style={{color: itemColor }}>{props.title}</p>
        </div>
    )
}

const mapStateToProps=(state)=>({
	panelReducer: state.panelReducer
})

export default connect(mapStateToProps, {setActivePanel}) (TabbarItem);
