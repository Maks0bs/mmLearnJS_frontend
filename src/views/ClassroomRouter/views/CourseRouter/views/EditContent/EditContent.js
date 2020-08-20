import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCourseById } from './services/actions'
import EditPanel from './components/EditPanel'
import EditActions from './components/EditActions'
import BigLoadingCentered from "../../../../../../components/reusables/BigLoadingCentered";
import {addNavItem, removeNavItem} from "../../../../../../services/actions";

class EditContent extends Component {
	constructor() {
		super();

		this.state = {
			showEditPanel: false
		}
	}

	componentDidMount(){
		let courseId = this.props.match.params.courseId;
		this.props.getCourseById(courseId)
			.then(() => {
				this.setState({
					showEditPanel: true
				})
				this.props.addNavItem({
					id: 'course link',
					name: 'Course "' + this.props.courseData.name + '"',
					path: `/classroom/course/${this.props.courseData._id}`
				})
			})
	}

	componentWillUnmount() {
		this.props.removeNavItem('course link')
	}

	render() {
		let { authenticatedUser: user } = this.props;
		if (!(user && user._id && user.role === 'teacher')){
			return (
				<div>
					you are not a teacher
				</div>
			)
		}
		if (this.state.showEditPanel){
			return (
				<div>
					<EditPanel />
					<EditActions />
				</div>
			);
		}
		else{
			return (
				<BigLoadingCentered />
			)
		}
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.editContent,
		authenticatedUser: state.services.authenticatedUser
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getCourseById: (courseId) => dispatch(getCourseById(courseId)),
		addNavItem: (item) => dispatch(addNavItem(item)),
		removeNavItem: (id) => dispatch(removeNavItem(id))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditContent);
