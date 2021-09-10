import { Panel,Search } from '@vkontakte/vkui';
import Header from '../components/Header'
import {connect} from 'react-redux';
import AddressItem from '../components/AddressItem'
import {addresses} from '../data'
import ROUTES from '../routes'
const SelectAddressPanel = (props) => {
    return(
        <Panel id={ROUTES.SELECT_ADDRESS}>
            <Header title="Select address" back={true} />
            <Search after={null} placeholder='Search'/>  
            {addresses.map(item => (
                <AddressItem item={item} key={item.address}/>
            ))}
        </Panel>
    )
}

const mapStateToProps=(state)=>({
	addressReducer: state.addressReducer
})

export default connect(mapStateToProps, {}) (SelectAddressPanel);
