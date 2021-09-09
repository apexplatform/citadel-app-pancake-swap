import ROUTES from '../routes'
import { Panel } from '@vkontakte/vkui';
import TransactionDetails from '../components/TransactionDetails'
import {connect} from 'react-redux';
import Header from '../components/Header'
import {setActivePage} from '../store/actions/panelActions'
const TransactionDetailsPanel = (props) => {
    const {openedTransaction} = props.transactionsReducer
    return(
        <Panel id={ROUTES.TRANSACTION_DETAILS}>
            <Header title={openedTransaction && openedTransaction.type} back={true} />
            <TransactionDetails data={openedTransaction}/>
        </Panel>
    )
}

const mapStateToProps=(state)=>({
	panelReducer: state.panelReducer,
    transactionsReducer: state.transactionsReducer
})

export default connect(mapStateToProps, {setActivePage}) (TransactionDetailsPanel);
