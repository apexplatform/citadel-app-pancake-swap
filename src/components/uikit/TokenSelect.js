import '../styles/components/tokenSelect.css'
import { Icon20ChevronRightOutline } from '@vkontakte/icons';
import {setActivePage} from '../../store/actions/panelActions'
import {connect} from 'react-redux';
import ROUTES from '../../routes'
import Icon from './Icon'
import {setSelectedToken} from '../../store/actions/walletActions'
const TokenSelect = (props) => {
    const {selectedToken} = props
    return(
        <div className='token-container' onClick={()=> {props.setSelectedToken(props.name);props.setActivePage(ROUTES.SELECT_TOKEN)}}>
            <div className='token-row'>
                {selectedToken.logoURI == 'img/coins/bnb.svg'? 
                <div className='bnb-icon-block'>
                    <Icon icon={'bsc'} width={24} height={24}/>
                </div>:
                <img src={selectedToken.logoURI} alt ='icon' onError={(e) => {e.target.src='img/icons/unsupported.svg'}}/>}
                <span className='token-name'>{selectedToken.name}</span>
                <Icon20ChevronRightOutline className='right-arrow' fill='#C5D0DB' width={25} height={25}/>
            </div>
        </div>
    )
}
const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer
})

export default connect(mapStateToProps, {setSelectedToken,setActivePage}) (TokenSelect);
