import React, { Component } from 'react';
import {Switch, Route, withRouter} from 'react-router-dom'
import MainRouter from './views/MainRouter'
import EditContent from './views/EditContent'
import EditInfo from './views/EditInfo'
import EditExercises from "./views/EditExercises";
import {connect} from "react-redux";
import { removeNavItem, addNavItem } from "../../../../services/routing/actions";
import BigLoadingCentered from "../../../../components/reusables/BigLoadingCentered";
import TeacherRoute from "./components/TeacherRoute";

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
	}

	render() {
		let { path, url: prefixUrl } = this.props.match;
		let { curUserCourseStatus: status } = this.props;
		if (!this.props.course || !this.props.course._id){
			return (<BigLoadingCentered />)
		}
		this.props.addNavItem({
			id: 'course link',
			name: 'Course "' + this.props.course.name + '"',
			path: `/classroom/course/${this.props.course._id}`
		})
		return (
			<div>
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
						path={`${path}`}
						component={MainRouter}
					/>
				</Switch>
			</div>
		);
	}
}

let mapStateToProps = (state) => ({
	course: state.views.classroom.course.services.course,
	curUserCourseStatus: state.views.classroom.course.services.curUserCourseStatus
})
let mapDispatchToProps = (dispatch) => ({
	removeNavItem: (id) => dispatch(removeNavItem(id)),
	addNavItem: (item) => dispatch(addNavItem(item))
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(CourseRouter));
