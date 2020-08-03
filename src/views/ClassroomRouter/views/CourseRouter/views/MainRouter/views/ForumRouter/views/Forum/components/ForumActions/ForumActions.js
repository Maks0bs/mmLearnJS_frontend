import React, { Component } from 'react';
import { connect } from 'react-redux'
import { hideModal, showModal } from '../../../../../../../../../../../../components/ModalRoot/services/actions';
import NewTopic from './components/NewTopic'

class ForumActions extends Component {

	showAddTopicModal = () => {
		this.props.showModal(
			<NewTopic onClose={this.props.hideModal} />
		)
	}

	handleLeave = () => {
		this.props.onClose && this.props.onClose();
	}

	componentWillUnmount(){
		this.handleLeave();
	}

	render() {
		return (
			<div>
				<button 
                    className="btn btn-outline btn-raised"
                    onClick={this.showAddTopicModal}
                    type="button"
                >
                    New topic
                </button>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main.forum
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		showModal: (component) => dispatch(showModal(component)),
		hideModal: () => dispatch(hideModal())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)
(ForumActions);
