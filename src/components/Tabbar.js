import '../styles/components/tabbar.css'
import {connect} from 'react-redux';
import { Config } from '../config/config';
import TabbarItem from './TabbarItem';
import ROUTES from '../routes'
const Tabbar = (props) => {
    const config = new Config()
    return(
        <div className='tabbar' style={{background: config.tabbarBackgroundColor }}>
            {
                config.tabbarMenuItems.map(item => (
                    <TabbarItem key={item.TITLE} icon={item.ICON} title={item.TITLE} routes={item.ROUTES} />
                ))
            }
            <TabbarItem title={'Transaction'} icon='transation' routes={ROUTES.TRANSACTIONS} />
            <TabbarItem title={'Settings'} icon='settings' routes={ROUTES.SETTINGS} />
        </div>
    )
}

const mapStateToProps=(state)=>({
	panelReducer: state.panelReducer
})

export default connect(mapStateToProps, {}) (Tabbar);
