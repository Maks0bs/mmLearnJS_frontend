import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter, Link } from 'react-router-dom'
import { clearMessages } from './services/actions'
import OpenCourseInfo from './components/OpenCourseInfo'
import CourseEnrollForm from './components/CourseEnrollForm'
import CreatorActions from './components/CreatorActions'
import CourseData from './components/CourseMainData'
import InvitedTeacherInfo from './components/InvitedTeacherInfo'
import { COURSE_USER_STATUS } from "../../services/helpers";

/**
 * The main page for displaying info about course. Depending on the user status
 * in relation to this course, different data is displayed.
 * It allows teachers and the creator
 * to perform additional actions.
 * @memberOf components.views.classroom.course
 * @component
 */
class CourseMain extends Component {

	componentWillUnmount() {
		this.props.clearMessages();
	}


	render() {
		let {
			ENROLLED, NOT_ENROLLED, TEACHER, CREATOR, INVITED_TEACHER_ENROLLED,
			NOT_AUTHENTICATED, INVITED_TEACHER
		} = COURSE_USER_STATUS;
		let { redirectToDashboard, curUserCourseStatus: status } = this.props;
		if (redirectToDashboard){
			this.props.clearMessages();
			return ( <Redirect to="/classroom/dashboard" />)
		}

		return (
			<div className="container my-4">
				{(() => {
					switch (status){
						case NOT_AUTHENTICATED: return(
							<div>
								<OpenCourseInfo />
								<div className="alert alert-info">
									Please { }
									<strong>
										<Link
											to={{
												pathname: '/signin',
												state: { redirectTo: this.props.location.pathname }
											}}
											style={{color: '#71ad09'}}
										>
											sign in
										</Link>
									</strong>
									{ } to access this course
								</div>
							</div>
						)
						case ENROLLED: return (
							<CourseData />
						)
						case TEACHER: return (
							<div>
								<hr />
								<CourseData />
							</div>
						)
						case INVITED_TEACHER: return (
							<div>
								<InvitedTeacherInfo />
								<OpenCourseInfo />
								<CourseEnrollForm />
							</div>
						)
						case INVITED_TEACHER_ENROLLED: return (
							<div>
								<InvitedTeacherInfo />
								<CourseData />
							</div>
						)
						case CREATOR: return (
							<div>
								<CourseData />
								<hr style={{borderWidth: '5px'}}/>
								<CreatorActions />
							</div>
						)
						case NOT_ENROLLED: return (
							<div >
								<OpenCourseInfo />
								<CourseEnrollForm />
							</div>
						)
						default: return null;
					}
				})()}
				<hr style={{borderWidth: '2px', borderColor: 'black'}}/>
			</div>
		)
	}
}
let mapStateToProps = (state) => ({
	...state.views.classroom.course.main,
	...state.views.classroom.course.services
})
let mapDispatchToProps = (dispatch) => ({
	clearMessages: () => dispatch(clearMessages()),
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(CourseMain));