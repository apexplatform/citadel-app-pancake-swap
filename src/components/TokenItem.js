import { Card } from '@vkontakte/vkui';
import {connect} from 'react-redux';
import '../styles/components/tokenItem.css'
import {setFromToken,setToToken} from '../store/actions/addressActions'
import {setActivePage} from '../store/actions/panelActions'
import ROUTES from '../routes'
import fileRoutes from '../config/file-routes-config.json'
import {prettyNumber} from '../helpers/numberFormatter'
const TokenItem = (props) => {
    const {selectedToken} = props.addressReducer
    const selectToken = (item) =>{
        if(selectedToken === 'from'){
            props.setFromToken(item)
        } else {
            props.setToToken(item)
        }
        props.setActivePage(ROUTES.HOME)
    }
    return(
        <Card className={"token-card"} onClick={() => selectToken(props.item)}>
            <div className='token-item'>
                <div className="token-icon">
                    <img src={fileRoutes.COINS_FOLDER+ props.item.value +'.svg'} alt='icon' />
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
	addressReducer: state.addressReducer
})

export default connect(mapStateToProps, {setActivePage,setFromToken,setToToken}) (TokenItem);
