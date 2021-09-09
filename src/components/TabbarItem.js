import '../styles/components/tabbar.css'
import {setActivePanel} from '../store/actions/panelActions'
import {connect} from 'react-redux';
import { Config } from '../config/config';
import Icon from './Icon'
const TabbarItem = (props) => {
    const {activePanel} = props.panelReducer
    const config = new Config()
    return(
        <div className='tabbar-item' id={activePanel === props.routes ? 'active-bar' : undefined} onClick={() => props.setActivePanel(props.routes)}>
            <Icon width={30} height={30} fill={activePanel === props.routes ? config.tabbarActiveItemColor : config.tabbarItemColor} icon={props.title}/>
            <p style={{color: config.tabbarItemColor }}>{props.title}</p>
        </div>
    )
}

const mapStateToProps=(state)=>({
	panelReducer: state.panelReducer
})

export default connect(mapStateToProps, {setActivePanel}) (TabbarItem);
