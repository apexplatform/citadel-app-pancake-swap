import { Icon20ChevronRightOutline } from '@vkontakte/icons';
import { Card } from '@vkontakte/vkui';
import '../styles/panels/address.css'
import ROUTES from '../routes'
import {connect} from 'react-redux';
import {setActivePage} from '../store/actions/panelActions'
import {fotmatAddress} from '../helpers/addressFormatter'
const AddressBlock = (props) => {
    const {selectedAddress} = props.addressReducer
    return(
        <Card onClick={()=> props.setActivePage(ROUTES.SELECT_ADDRESS)} className="address-block-card">
            <div className='address-block'>
                <div className="address-icon">
                    <img src='/img/coins/cosmos.svg' alt='icon' />
                </div>
                <div className="address-content">
                    <div className='address-row'>
                        <p className="address-name">{selectedAddress?.name}</p>
                        <span className="address-text">({fotmatAddress(selectedAddress?.address)})</span>
                    </div>
                    <div className='address-row'>
                        <p className="address-block-amount">{selectedAddress.amount}</p>
                        <span className="address-network">{selectedAddress?.network}</span>
                    </div>
                </div>
                <Icon20ChevronRightOutline fill="#818C99" width={30} height={30}/> 
            </div>
        </Card>
    )
}

const mapStateToProps=(state)=>({
	addressReducer: state.addressReducer
})

export default connect(mapStateToProps, {setActivePage}) (AddressBlock);
