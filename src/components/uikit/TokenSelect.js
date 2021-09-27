import '../styles/components/tokenSelect.css'
import { Icon20ChevronRightOutline } from '@vkontakte/icons';
import {setActivePage} from '../../store/actions/panelActions'
import {connect} from 'react-redux';
import ROUTES from '../../routes'
import Icon from './Icon'
const TokenSelect = (props) => {
    const {selectedToken} = props
    return(
        <div className='token-container' onClick={()=>props.setActivePage(ROUTES.SELECT_TOKEN)}>
            <div className='token-row'>
                <Icon icon={selectedToken.value} fill={'#792EC0'}/>
                <span className='token-name'>{selectedToken.label}</span>
                <Icon20ChevronRightOutline className='right-arrow' fill='#C5D0DB' width={25} height={25}/>
            </div>
        </div>
    )
}
const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer
})

export default connect(mapStateToProps, {setActivePage}) (TokenSelect);
