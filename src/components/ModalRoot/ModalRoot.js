import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { hideModal } from './services/actions'
import PropTypes from "prop-types";

Modal.setAppElement(document.getElementById('root'));

class ModalRoot extends Component {
	
	componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, false);
        document.addEventListener('keydown', this.handleKey, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
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
		let { modalComponent } = this.props;
		if (!modalComponent) {
			return null;
		}
		// may be able to pass props to custom modal
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

let mapStateToProps = (state) => {
	let { modalComponent } = state.components.modalRoot;
	return {
		modalComponent
	}
}

ModalRoot.propTypes = {
	hideModal: PropTypes.func,
	modalComponent: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.func,
		PropTypes.string
	])
}

export default connect(
	mapStateToProps,
	{ hideModal }
)(ModalRoot)
