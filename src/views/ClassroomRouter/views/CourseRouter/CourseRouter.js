import React, { Component } from 'react';
import {Switch, Route, withRouter} from 'react-router-dom'
import EditContent from './views/EditContent'
import EditInfo from './views/EditInfo'
import EditExercises from "./views/EditExercises";
import {connect} from "react-redux";
import { showModal, hideModal } from "../../../../components/ModalRoot/services/actions";
import { cleanup, viewCourse } from "./services/actions";
import { removeNavItem, addNavItem } from "../../../../services/routing/actions";
import ExerciseRouter from "./views/ExerciseRouter";
import Info from "./views/CourseMain";
import BigLoadingCentered from "../../../../components/reusables/BigLoadingCentered";
import TeacherRoute from "./components/TeacherRoute";
import EnrolledRoute from "./components/EnrolledRoute";
import ForumRouter from "./views/ForumRouter";
import GradesRouter from "./views/GradesRouter";
import CourseTabs from "./components/CourseTabs";
import FirstTimeInfo from "./components/FirstTimeInfo";

/**
 * @namespace components.views.classroom.course
 */

/**
 * This router is responsible for all pages
 * that contain detailed data of one single course
 * @memberOf components.views.classroom.course
 * @component
 */
class CourseRouter extends Component {

	componentWillUnmount() {
		this.props.removeNavItem('course link');
		this.props.cleanup();
	}

	render() {
		let { path, url: prefixUrl } = this.props.match;
		let { curUserCourseStatus: status, course, firstTime } = this.props;
		if (!course || !course._id){
			return (<BigLoadingCentered />)
		}
		if (firstTime){
			this.props.showModal(<FirstTimeInfo />);
		}
		this.props.addNavItem({
			id: 'course link',
			name: 'Course "' + course.name + '"',
			path: `/classroom/course/${course._id}`
		})
		return (
			<div>
				<CourseTabs status={status}/>
				<Switch>
					<TeacherRoute
						coursePrefix={prefixUrl}
						status={status}
						exact path={`${path}/edit-info`}
						component={EditInfo}
					/>
					<TeacherRoute
						coursePrefix={prefixUrl}
						status={status}
						exact path={`${path}/edit`}
						component={EditContent}
					/>
					<TeacherRoute
						coursePrefix={prefixUrl}
						status={status}
						exact path={`${path}/edit-exercises`}
						component={EditExercises}
					/>
					<Route
						exact path={`${path}/`}
						render={() => {
							this.props.viewCourse(course._id);
							return <Info />;
						}}
					/>
					<EnrolledRoute
						coursePrefix={prefixUrl}
						status={status}
						path={`${path}/forum/:forumId`}
						component={ForumRouter}
					/>
					<EnrolledRoute
						coursePrefix={prefixUrl}
						status={status}
						path={`${path}/exercise/:exerciseId`}
						component={ExerciseRouter}
					/>
					<EnrolledRoute
						coursePrefix={prefixUrl}
						status={status}
						path={`${path}/grades/:gradeFilter`}
						component={GradesRouter}
					/>
				</Switch>
			</div>
		);
	}
}
let mapStateToProps = (state) => ({
	...state.views.classroom.course.services
})
let mapDispatchToProps = (dispatch) => ({
	removeNavItem: (id) => dispatch(removeNavItem(id)),
	addNavItem: (item) => dispatch(addNavItem(item)),
	cleanup: () => dispatch(cleanup()),
	viewCourse: (id) => dispatch(viewCourse(id)),
	showModal: (component) => dispatch(showModal(component)),
	hideModal: () => dispatch(hideModal())
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(CourseRouter));