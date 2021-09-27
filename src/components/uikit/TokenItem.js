import { Card } from '@vkontakte/vkui';
import {connect} from 'react-redux';
import '../styles/components/tokenItem.css'
import {setSelectedToken,setFromToken,setToToken} from '../../store/actions/walletActions'
import {setActivePage} from '../../store/actions/panelActions'
import ROUTES from '../../routes'
import {prettyNumber} from '../helpers/numberFormatter'
import Icon from './Icon'
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
                    <Icon icon={props.item?.value}/>
                </div>
                <div className="token-content">
                    <p className="token-name">{props.item.label}</p>
                </div>
                {props.withAmount &&
                <div className="token-amount-block">
                    <p>{prettyNumber(props.item?.amount)}</p>
                    <span>{props.item.label}</span>
                </div>}
            </div>
        </Card>
    )
}

const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer
})

export default connect(mapStateToProps, {setFromToken,setToToken,setActivePage,setSelectedToken}) (TokenItem);
