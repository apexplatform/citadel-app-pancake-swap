import ROUTES from '../../routes'
import { Panel,Search } from '@vkontakte/vkui';
import Header from '../uikit/Header'
import {connect} from 'react-redux';
import TokenItem from '../uikit/TokenItem'
import {tokens} from '../../data'

const SelectTokenPanel = (props) => {
    
    return(
        <Panel id={ROUTES.SELECT_ADDRESS}>
            <Header title="Select token to send" back={true} />
            <Search after={null} placeholder='Search'/>  
            {tokens.map(item => (
                <TokenItem item={item} withAmount={true} key={item.network}/>
            ))}
        </Panel>
    )
}

const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer
})

export default connect(mapStateToProps, {}) (SelectTokenPanel);
