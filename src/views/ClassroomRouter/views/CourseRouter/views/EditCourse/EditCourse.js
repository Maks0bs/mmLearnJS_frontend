import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCourseById } from './services/actions'
import EditPanel from './components/EditPanel'

class EditCourse extends Component {

	componentDidMount(){
		let courseId = this.props.match.params.courseId;
		this.props.getCourseById(courseId)
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
		return (
			<EditPanel />
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.edit,
		authenticatedUser: state.services.authenticatedUser
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getCourseById: (courseId) => dispatch(getCourseById(courseId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditCourse);
