import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'


class ModalRoot extends Component {
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
				style={{
					overlay: {
						position: 'fixed',
						backgroundColor: 'rgba(0, 0, 0, 0.4)',
						zIndex: 10,
						'overflow-y': 'hidden'
					},
					content: {
						margin: '2%',
						left: '100px',
						right: '100px'
					}
				}}
				shouldCloseOnEsc={true}
			>
				<ModalComponent />
			</Modal>
		)
	}
}


// !!!!!!!!!!!!!!!
let mapStateToProps = (state) => {
	let { ModalComponent } = state.viewsReducer.components;
	return {
		ModalComponent
	}
}

export default connect(
	mapStateToProps,
	null
)(ModalRoot)
