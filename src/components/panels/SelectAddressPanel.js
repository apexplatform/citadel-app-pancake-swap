import { Panel,Search } from '@vkontakte/vkui';
import Header from '../uikit/Header'
import {connect} from 'react-redux';
import AddressItem from '../uikit/AddressItem'
import ROUTES from '../../routes'
const SelectAddressPanel = (props) => {
    const {wallets} = props.walletReducer
    return(
        <Panel id={ROUTES.SELECT_ADDRESS}>
            <Header title="Select address" back={true} />
            <Search after={null} placeholder='Search'/>  
            {wallets.map(item => (
                <AddressItem item={item} key={item.address}/>
            ))}
        </Panel>
    )
}

const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer
})

export default connect(mapStateToProps, {}) (SelectAddressPanel);
