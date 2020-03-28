import React, { Component } from 'react';
import SigninModal from './SigninModal'

let MODAL_COMPONENTS = {
	'SIGNIN': SigninModal
}

class ModalRoot extends Component {
	render() {
		let { modalType } = this.props;
		if (!modalType) {
			return null;
		}

		return MODAL_COMPONENTS[modalType]
	}
}

let mapStateToProps = (state) => {
	let { modalType } = state.viewsReducer.components;
	return {
		modalType
	}
}

export default connect(
	mapStateToProps
	null
)(ModalRoot)
