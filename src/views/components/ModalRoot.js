import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { hideModal } from './services/actions'

Modal.setAppElement(document.getElementById('root'));

class ModalRoot extends Component {
	
	componentDidMount() {
        console.log('mount');
        document.addEventListener('mouseup', this.handleClick, false);
        document.addEventListener('keydown', this.handleKey, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mouseup', this.handleClick, false);
        document.removeEventListener('keydown', this.handleKey, false);
    }

    handleKey = (e) => {
    	if (this.contentRef && e.key === 'Escape'){
    		this.props.hideModal()
    	}
    }

    handleClick = (e) => {
        if (this.contentRef && this.contentRef.contains(e.target)){
            return;
        }

        this.props.hideModal();
    }

	render() {
		let { ModalComponent } = this.props;
		if (!ModalComponent) {
			return null;
		}
		// may be able to pass props to custon modal
		// see https://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions
		return (
			<Modal
				isOpen={true}
				contentRef={node => (this.contentRef = node)}
				style={{
					overlay: {
						position: 'fixed',
						backgroundColor: 'rgba(0, 0, 0, 0.4)',
						zIndex: 10
					},
					content: {
						padding: '0px',
						left: '15%',
						right: '15%'
					}
				}}
			>
				<ModalComponent />
			</Modal>
		)
	}
}

let mapStateToProps = (state) => {
	let { ModalComponent } = state.views.components;
	return {
		ModalComponent
	}
}

export default connect(
	mapStateToProps,
	{ hideModal }
)(ModalRoot)
