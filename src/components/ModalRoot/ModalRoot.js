import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { hideModal } from './services/actions'

/*
	Initial configuration.
	Essential for modal to display normally
 */
Modal.setAppElement(document.getElementById('root'));

/**
 * Used to display modals with any custom component inside
 * There should only be one ModalRoot per app
 *
 * @memberOf components.common
 * @component
 */
class ModalRoot extends Component {
	
	componentDidMount() {
		/*
			If user clicks outside of modal inner area or presses Escape, close the modal
		 */
        document.addEventListener('mousedown', this.handleClick, false);
        document.addEventListener('keydown', this.handleKey, false);
    }

    componentWillUnmount() {
		/*
			Cleanup of listeners to prevent memory leaks
		 */
        document.removeEventListener('mousedown', this.handleClick, false);
        document.removeEventListener('keydown', this.handleKey, false);
    }

    handleKey = (e) => {
		/*
			Close modal, when Escape is pressed
		 */
    	if (this.contentRef && e.key === 'Escape'){
    		this.props.hideModal()
    	}
    }

    handleClick = (e) => {
		/*
			Close modal, if user clicks outside of modal inner content
		 */
        if (this.contentRef && this.contentRef.contains(e.target)){
            return;
        }
        this.props.hideModal();
    }

	render() {
		let { modalComponent } = this.props;
		let isMobileWidth = (window.innerWidth <= 1000)
		return (
			<Modal
				isOpen={!!modalComponent}
				contentRef={node => (this.contentRef = node)}
				style={{
					overlay: {
						position: 'fixed',
						backgroundColor: 'rgba(0, 0, 0, 0.4)',
						/*
							Increase z-index, so that
							the modal is shown above all other components
						 */
						zIndex: 10
					},
					content: {
						padding: '0px',
						left: isMobileWidth ? '15%' : '25%',
						right: isMobileWidth ? '15%' : '25%'
					}
				}}
			>
				{/*
					[X] button to close the modal on click
				*/}
				<button 
                    onClick={() => this.props.hideModal()}
                    className="float-right close m-2"
                > 
                    <span aria-hidden="true">&times;</span>
                </button>

				{modalComponent}
			</Modal>
		)
	}
}

let mapStateToProps = (state) => ({
	...state.components.modalRoot
})
let mapDispatchToProps = (dispatch) => ({
	hideModal: () => dispatch(hideModal())
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ModalRoot)
