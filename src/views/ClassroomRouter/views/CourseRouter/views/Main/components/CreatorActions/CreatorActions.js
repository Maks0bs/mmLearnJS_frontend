import React, { Component } from 'react';
import { hideModal, showModal } from '../../../../../../../../components/ModalRoot/services/actions'
import { connect } from 'react-redux'
import DeleteCourse from './components/DeleteCourse'
import AddTeachers from './components/AddTeachers'

class CreatorActions extends Component {

	//add delete action here!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	onDeleteCourse = (e) => {
		e.preventDefault();
		this.props.showModal(
			<DeleteCourse
                onClose={this.props.hideModal} 
			/>
		)
	}

	showAddTeachersModal = (e) => {
		e.preventDefault();
		this.props.showModal(
			<AddTeachers
                onClose={this.props.hideModal} 
			/>
		)
	}

	render() {
		return (
			<div>
				<h1>Creator actions:</h1>
				<button 
					className="btn btn-raised btn-outline btn-info ml-3"
					type="button"
					onClick={this.showAddTeachersModal}
				>
					Add teachers
				</button>

				<button 
					className="btn btn-raised btn-outline btn-danger ml-3"
					type="button"
					onClick={this.onDeleteCourse}
				>
					Delete course
				</button>
			</div>
		);
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		hideModal: () => dispatch(hideModal()),
		showModal: (component) => dispatch(showModal(component))
	}
}

export default connect(
	null,
	mapDispatchToProps
)
(CreatorActions);
