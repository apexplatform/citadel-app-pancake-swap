import ROUTES from '../routes'
import { Panel,Search } from '@vkontakte/vkui';
import Header from '../components/Header'
import {connect} from 'react-redux';
import TokenItem from '../components/TokenItem'
import {tokens} from '../data'

const SelectTokenPanel = (props) => {
    
    return(
        <Panel id={ROUTES.SELECT_ADDRESS}>
            <Header title="Select token to send" back={true} />
            <Search after={null} placeholder='Search'/>  
            {tokens.map(item => (
                <TokenItem item={item} withAmount={true} key={item.value}/>
            ))}
        </Panel>
    )
}

const mapStateToProps=(state)=>({
	addressReducer: state.addressReducer
})

export default connect(mapStateToProps, {}) (SelectTokenPanel);
