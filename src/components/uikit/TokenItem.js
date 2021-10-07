import { Card } from '@vkontakte/vkui';
import {connect} from 'react-redux';
import '../styles/components/tokenItem.css'
import {setSelectedToken,setFromToken,setToToken} from '../../store/actions/walletActions'
import {setActivePage} from '../../store/actions/panelActions'
import ROUTES from '../../routes'
import {setInPool,setOutPool} from '../../store/actions/swapActions'
import Icon from './Icon'
const TokenItem = (props) => {
    const {currentToken} = props.walletReducer
    const selectToken = (item) =>{
        if(currentToken === 'from'){
            props.setFromToken(item)
            props.setInPool(item)
        } else {
            props.setToToken(item)
            props.setOutPool(item)
        }
        props.setActivePage(ROUTES.HOME)
    }

    return(
        <Card className={"token-card"} onClick={() => selectToken(props.item)}>
            <div className='token-item'>
                <div className="token-icon center">
                    <Icon icon={props.item?.network}/>
                </div>
                <div className="token-content">
                    <p className="token-name">{props.item.network}</p>
                </div>
                {props.withAmount &&
                <div className="token-amount-block">
                    <span>{props.item.network}</span>
                </div>}
            </div>
        </Card>
    )
}

const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer
})

export default connect(mapStateToProps, {setInPool,setOutPool,setFromToken,setToToken,setActivePage,setSelectedToken}) (TokenItem);
