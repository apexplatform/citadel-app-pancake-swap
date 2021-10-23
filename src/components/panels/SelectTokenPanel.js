import ROUTES from '../../routes'
import { Panel,Search } from '@vkontakte/vkui';
import Header from '../uikit/Header'
import {connect} from 'react-redux';
import TokenItem from '../uikit/TokenItem'
import tokenList from '../../config/tokenLists/pancake-default.tokenlist.json'

const SelectTokenPanel = (props) => {
    
    return(
        <Panel id={ROUTES.SELECT_ADDRESS}>
            <Header title="Select token to send" back={true} />
            <Search after={null} placeholder='Search'/>  
            {tokenList.tokens.map(item => (
                <TokenItem item={item} withAmount={true} key={item.symbol}/>
            ))}
        </Panel>
    )
}

const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer
})

export default connect(mapStateToProps, {}) (SelectTokenPanel);
