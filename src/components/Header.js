import '../styles/components/header.css'
import { Config } from '../config/config'
import ROUTES from '../routes'
import { Icon24Back } from '@vkontakte/icons'
import {connect} from 'react-redux'
import {setActivePage} from '../store/actions/panelActions'
const Header = (props) => {
    const config = new Config()
    return(
        <div className='header' style={{background: config.headerBackgroundColor }}>
            <div className='header-line'></div>
            <div className='header-row'>
                {props.back && 
                    <div className='header-back-row' onClick={()=>props.setActivePage(ROUTES.HOME)}>
                        <Icon24Back fill='#818C99' />{config.headerBackButtonTitle}
                    </div>
                }
                <p>{props.title}</p>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>({
	panelReducer: state.panelReducer
})

export default connect(mapStateToProps, {setActivePage}) (Header);
