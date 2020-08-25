import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { clearMessages, getCourseById } from './services/actions'
import { showModal, hideModal} from "../../../../../../../../components/ModalRoot/services/actions";
import { getFirstTimeStatus } from "../../services/actions";
import OpenCourseInfo from './components/OpenCourseInfo'
import CourseEnrollForm from './components/CourseEnrollForm'
import TeacherActions from './components/TeacherActions'
import CreatorActions from './components/CreatorActions'
import CourseData from './components/CourseData'
import InvitedTeacherInfo from './components/InvitedTeacherInfo'
import { getEnrollmentStatus } from '../../../../services/helpers'
import CourseTabs from "../../components/CourseTabs";
import BigLoadingCentered from "../../../../../../../../components/reusables/BigLoadingCentered";
import FirstTimeInfo from "./components/FirstTimeInfo";

class Info extends Component {

	componentDidMount() {
		this.props.getFirstTimeStatus()
			.then((v) => {
				console.log(v);
				if (this.props.firstTime){
					this.props.showModal(
						<FirstTimeInfo onClose={this.props.hideModal}/>
					)
				}
			})
	}


	render() {
		console.log('render info', this.props);
		if (this.props.redirectToDashboard){
			this.props.clearMessages();
			return (
				<Redirect to="/classroom/dashboard" />
			)
		}
		if (!this.props.courseData){
			return (
				<BigLoadingCentered />
			);
		}
		let status = getEnrollmentStatus(this.props.courseData, this.props.authenticatedUser);
		let course;
		switch (status){
			case 'not logged in':
				course = (
					<div>
						<OpenCourseInfo />
						<div className="alert alert-info">
							Please log in to access this course
						</div>
					</div>
					// add login button for convenience
				)
				break;
			case 'enrolled':
				course = (
					<div>
						<CourseTabs status={status}/>
						<CourseData />
					</div>
				)
				break;
			case 'teacher':
				course =(
					<div>


						<CourseTabs status={status}/>
						<TeacherActions />
						<hr />
						<CourseData />
					</div>
				)
				break;
			case 'invited teacher':
				course = (
					<div>
						<InvitedTeacherInfo />
						<OpenCourseInfo />
						<CourseEnrollForm />
					</div>
				)
				break;
			case 'invited teacher enrolled':
				course = (
					<div>
						<CourseTabs status={status}/>
						<InvitedTeacherInfo />
						<CourseData />
					</div>
				)
				break;
			case 'creator':
				course = (
					<div>

						<CourseTabs status={status}/>
						<TeacherActions />
						<CreatorActions />
						<hr/>
						<CourseData />
					</div>
				)
				break;
			case 'not enrolled':
				course = (
					<div >
						<OpenCourseInfo />
						<CourseEnrollForm />
					</div>
				)
				break;
			default:
				course = null;
				break;
		}
		return (
			<div className="container mt-3 mb-5">
				{course}
				<hr style={{
					borderWidth: '2px',
					borderColor: 'black'
				}}/>
			</div>

		)
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main.info,
		...state.views.classroom.course.main.services,
		authenticatedUser: state.services.authenticatedUser
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		clearMessages: () => dispatch(clearMessages()),
		getFirstTimeStatus: () => dispatch(getFirstTimeStatus()),
		showModal: (component) => dispatch(showModal(component)),
		hideModal: () => dispatch(hideModal())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Info));