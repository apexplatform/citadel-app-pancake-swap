import '../styles/components/tabbar.css'
import {setActivePanel,setPreviosPanel} from '../../store/actions/panelActions'
import {connect} from 'react-redux';
import { Config } from '../../config/config';
import Icon from './Icon'
import ROUTES from '../../routes'
import {loadTransactions} from '../../store/actions/transactionsActions'
import { useEffect, useState } from 'react';
import {setLoader} from '../../store/actions/panelActions'
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
        props.setPreviosPanel(activePanel)
        props.setActivePanel(props.routes)
        if(activePanel === props.routes){
            setItemColor(config.tabbarParamsFromConfig('ACTIVE_ITEM_COLOR'))
        }
        if(props.routes == ROUTES.TRANSACTIONS){
            props.setLoader(false)
            props.loadTransactions()
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

export default connect(mapStateToProps, {setLoader,loadTransactions,setPreviosPanel,setActivePanel}) (TabbarItem);
