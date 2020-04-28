import React, { Component } from 'react';
import { createCourse, clearMessages } from './services/actions'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getEnrollmentStatus } from '../../../../services/helpers'
import ForumActions from './components/ForumActions'
import ForumTopics from './components/ForumTopics'
import { getForumFromCourse } from './services/actions'

class Forum extends Component {

	render(){
		if (this.props.courseData._id){
			this.props.getForumFromCourse(this.props.courseData, this.props.match.params.forumId);
		}
		else{
			return null;
		}
		
		let forumData = this.props.forumData;
		let status = getEnrollmentStatus(this.props.courseData, this.props.authenticatedUser);
		console.log('status', status);
		switch (status) {
			case 'not logged in':
			case 'not enrolled' : {
				return (
					<Redirect
						to={`/classroom/course/${this.props.courseData._id}`}
					/>
				)
			}
			case 'invited teacher': {
				return (
					<div>
						You are an invited teacher
					</div>
				)
			}
			case 'enrolled': {
				return (
					<div>
						{!forumData.teachersOnly && (
							<ForumActions />
						)}
						<ForumTopics />
					</div>
				)
			}
			case 'teacher':
			case 'creator': {
				return (
					<div>
						<ForumActions />
						<ForumTopics />
					</div>
				)
			}
		}
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getForumFromCourse: (courseData, forumId) => dispatch(getForumFromCourse(courseData, forumId))
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main.forum,
		...state.views.classroom.course.main.services,
		authenticatedUser: state.services.authenticatedUser
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Forum);