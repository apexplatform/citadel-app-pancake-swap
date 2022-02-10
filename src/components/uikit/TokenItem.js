import { Card } from '@vkontakte/vkui';
import {connect} from 'react-redux';
import '../styles/components/tokenItem.css'
import {setSelectedToken,setFromToken,setToToken} from '../../store/actions/walletActions'
import {setActivePage} from '../../store/actions/panelActions'
import ROUTES from '../../routes'
import {numberWithCommas} from '../helpers/numberFormatter'
const TokenItem = (props) => {
    const {currentToken} = props.walletReducer
    const selectToken = (item) =>{
        if(currentToken === 'from'){
            props.setFromToken(item)
        } else {
            props.setToToken(item)
        }
        props.setActivePage(ROUTES.HOME)
    }

    return(
        <Card className={"token-card"} onClick={() => selectToken(props.item)}>
            <div className='token-item'>
                <div className="token-icon center">
                    <img src={props.item?.logoURI} alt ='icon' onError={(e) => {e.target.src='img/icons/unsupported.svg'}}/>
                </div>
                <div className="token-content">
                    <p className="token-symbol">{props.item.name}</p>
                </div>
                {props.withAmount &&
                <div className="token-amount-block">
                    <p className="token-symbol">{numberWithCommas(props.item.balance || 0)}</p>
                    <span>{props.item.symbol}</span>
                </div>}
            </div>
        </Card>
    )
}

const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer
})

export default connect(mapStateToProps, {setFromToken,setToToken,setActivePage,setSelectedToken}) (TokenItem);
