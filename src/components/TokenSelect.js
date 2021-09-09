import '../styles/components/tokenSelect.css'
import { Icon20ChevronRightOutline } from '@vkontakte/icons';
import {setActivePage} from '../store/actions/panelActions'
import {connect} from 'react-redux';
import ROUTES from '../routes'
import fileRoutes from '../config/file-routes-config.json'

const TokenSelect = (props) => {
    const {selectedToken} = props.addressReducer
    return(
        <div className='token-container' onClick={()=>props.setActivePage(ROUTES.SELECT_TOKEN)}>
            <div className='token-row'>
                <img src={fileRoutes.COINS_FOLDER + selectedToken.value +'.svg'} className='token-img' alt='token' />
                <span className='token-name'>{selectedToken.label}</span>
                <Icon20ChevronRightOutline className='right-arrow' fill='#C5D0DB' width={25} height={25}/>
            </div>
        </div>
    )
}
const mapStateToProps=(state)=>({
	addressReducer: state.addressReducer
})

export default connect(mapStateToProps, {setActivePage}) (TokenSelect);
