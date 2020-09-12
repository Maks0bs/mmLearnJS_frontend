import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { saveChangesSections } from '../services/actions'
import { addToast } from '../../../../../../../components/ToastRoot/services/actions'
import BigLoadingAbsolute from "../../../../../../../components/reusables/BigLoadingAbsolute";

/**
 * Allows the teacher to save edit course data or cancel the changes
 * @memberOf components.views.classroom.course.EditContent
 * @component
 */
class EditContentActions extends Component {
	constructor(props){
		super(props);
		this.state = {redirectToMain: false, loading: false}
	}

	handleLeave = (e) => {
		e && e.preventDefault();
		this.setState({redirectToMain: true})
	}

	handleSaveChanges = (e) => {
		e.preventDefault();
		if (!this.props.newSections){
			return;
		}
		this.setState({loading: true})
		this.props.saveChanges(this.props.newSections, this.props.course._id)
			.then(() => {
				this.setState({loading: false})
				if (!this.props.error){
					this.handleLeave();
					this.props.addToast(
						(<div>Course data has been changed</div>),
						{type: 'success'}
					)
				} else {
					this.props.addToast(
						(<div>{this.props.error}</div>),
						{type: 'error'}
					)
				}

			})
	}

	render() {
		if (this.state.redirectToMain){
			return <Redirect to={`/classroom/course/${this.props.course._id}`} />
		}
		return (
			<div>
				{this.state.loading && (<BigLoadingAbsolute />)}
				<button 
					className="btn btn-raised btn-outline btn-danger ml-3"
					onClick={this.handleLeave}
				>
					Cancel changes
				</button>
				<button 
					className="btn btn-raised btn-outline btn-success ml-3"
					onClick={this.handleSaveChanges}
				>
					Save changes
				</button>
			</div>
		);
	}
}
let mapStateToProps = (state) => ({
	course: state.views.classroom.course.services.course,
	...state.views.classroom.course.editContent.services
})
let mapDispatchToProps = (dispatch) => ({
	saveChanges: (sections, id) => dispatch(saveChangesSections(sections, id)),
	addToast: (component, options) => dispatch(addToast(component, options))
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditContentActions)