import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CourseListItem from "../CourseListItem";
import { getUserSubscribedSet, transitionStyles} from "../../services/helpers";
import { Transition } from 'react-transition-group'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import CollapsibleCourseList from "../CollapsibleCourseList";

class TeacherList extends Component {
	constructor(props){
		super(props);

		this.state = {
			redirectToCreateCourse: false,
			showList: false
		}
	}

	handleCreateCourse = () => {
		this.setState({
			redirectToCreateCourse: true
		})
	}



	render() {
		let { redirectToCreateCourse } = this.state;
		if (redirectToCreateCourse){
			return (
				<Redirect to="/classroom/course/create" />
			)
		}

		let subscribedSet = getUserSubscribedSet(this.props.authenticatedUser);

		
		/*return (

			<div className={this.props.className}>
				<button
					className="btn btn-outline m-4"
					onClick={this.handleCreateCourse}
				>
					Create new course
				</button>
				<a
					onClick={this.handleListClick}
					style={{
						display: 'flex',
						alignItems: 'center',
						color: 'darkblue',
						cursor: 'pointer'
					}}
				>
						<Icon
							className="fa-2x"
							icon={this.state.showList ? faCaretDown : faCaretRight}
							style={{
								float: 'left'
							}}
						/>
						<h1>Teacher courses: </h1>
				</a>
				<Transition
					in={this.state.showList}
					timeout={100}
					unmountOnExit
					appear
				>
					{state => (
						<div
							style={{
								...transitionStyles[state]
							}}
						>
							{this.props.teacherCourses.map((course, i) => (
								<div key={i}>
									<CourseListItem
										course={course}
										notifications={this.props.notViewedNotifications[course._id]}
										subscribed={!!subscribedSet[course._id]}
									/>
								</div>
							))}
						</div>
					)}
				</Transition>

			</div>
		);*/
		return (
			<div className={this.props.className}>
				<button
					className="btn btn-outline m-4"
					onClick={this.handleCreateCourse}
				>
					Create new course
				</button>
				<CollapsibleCourseList
					listName="Teacher courses"
				>
					{this.props.teacherCourses.map((course, i) => (
						<div key={i}>
							<CourseListItem
								course={course}
								notifications={this.props.notViewedNotifications[course._id]}
								subscribed={!!subscribedSet[course._id]}
							/>
						</div>
					))}
				</CollapsibleCourseList>
			</div>
		)
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.courseList,
		authenticatedUser: state.services.authenticatedUser
	}
}

export default connect(
	mapStateToProps,
	null
)(TeacherList);