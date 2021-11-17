import { ModalRoot,ModalPage,ModalPageHeader } from '@vkontakte/vkui';
import {setActivePanel,setActiveModal} from '../../store/actions/panelActions'
import {connect} from 'react-redux';
import '../styles/components/errorModal.css'
import text from '../../text.json'
const ErrorModal = (props) => {
    const {activeModal} = props.panelReducer
    const {networkErrors} = props.errorsReducer
    return(
		<ModalRoot activeModal={activeModal}>
		  <ModalPage id="errors" dynamicContentHeight onClose={() => props.setActiveModal(null)}>
        <div id='modal-header'>
            <img src='/img/icons/errorModal.svg' alt='error' />
            <p className='error-title'>{text.ERROR_HEADER}</p>
        </div>
			  <p className='error-text'>{networkErrors}</p>
        <p className='error-description'>{text.ERROR_DESCRIPTION_1}</p>
        <div className='error-tips'>
            <img src='/img/icons/tips.svg' alt='error' />
            <div>
                <h4>{text.TIP}</h4>
                <span className='tips-description'>{text.ERROR_TIP_1}</span>
            </div>
        </div>
        <button className='error-btn' onClick={() => props.setActiveModal(null)}>Ok</button>
		  </ModalPage>
		</ModalRoot>
	  );
}

const mapStateToProps=(state)=>({
	panelReducer: state.panelReducer,
    errorsReducer: state.errorsReducer
})

export default connect(mapStateToProps, {setActiveModal,setActivePanel}) (ErrorModal);
