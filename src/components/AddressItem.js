import {fotmatAddress} from '../helpers/addressFormatter'
import { Card } from '@vkontakte/vkui';
import {connect} from 'react-redux';
import ROUTES from '../routes'
import {setSelectedAddress} from '../store/actions/addressActions'
import {setActivePage} from '../store/actions/panelActions'
import '../styles/components/addressItem.css'
import fileRoutes from '../config/file-routes-config.json'
const AddressItem = (props) => {
    const {selectedAddress} = props.addressReducer
    const {item} = props
    let active = selectedAddress.address === item.address && 'active-address'
    const selectAddress = () => {
        props.setSelectedAddress(item)
        props.setActivePage(ROUTES.HOME)
    }
    return(
        <Card className={active + " address-card"} onClick={() => selectAddress()}>
            <div className='address-item'>
                <div className="address-icon">
                    <img src={fileRoutes.COINS_FOLDER + item?.network + '.svg'} alt='icon' />
                </div>
                <div className="address-content">
                    <div className='address-row'>
                        <p className="address-name">{item.name}</p>
                        <span className="address">({fotmatAddress(item.address)})</span>
                    </div>
                    <div className='address-row'>
                        <p className="address-name address-amount">{item.amount}</p>
                        <span className="address-network">{item.network}</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}

const mapStateToProps=(state)=>({
	addressReducer: state.addressReducer
})

export default connect(mapStateToProps, {setSelectedAddress,setActivePage}) (AddressItem);
