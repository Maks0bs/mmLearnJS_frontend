import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurUserCourseStatus } from '../../../../services/helpers'
import ForumActions from './components/ForumActions'
import ForumTopics from './components/ForumTopics'

class Forum extends Component {

	render(){
		let status = getCurUserCourseStatus(this.props.courseData, this.props.authenticatedUser);
		
		let forumName = this.props.forumData.name;
		let forumContent = this.props.forumData.content;
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
					<div className="container my-3">
						{!forumContent.teachersOnly && (
							<ForumActions />
						)}
						<ForumTopics />
					</div>
				)
			}
			case 'teacher':
			case 'creator': {
				return (
					<div className="container my-3">
						<ForumActions />
						<ForumTopics />
					</div>
				)
			}
		}
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
	mapStateToProps
)(Forum);