import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getEnrolledCourses } from '../../services/actions'

class StudentDashboard extends Component {

	componentDidMount(){
		this.props.getEnrolledCourses(this.props.authenticatedUser._id);
	}

	render() {
		let { enrolledCourses: courses } = this.props;
		if (!courses){
			courses = [];
		}
		let coursesList = [];
		for (let i = 0;  i < courses.length; i++){
			coursesList.push(
				<div>
					<Link 
						key={i}
						to={`/classroom/course/${courses[i]._id}`}
					>
						{courses[i].name}
					</Link>
				</div>
			)
		}
		return (
			<div className={this.props.className}>
				<h1>Enrolled courses: </h1>
				{coursesList}
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.dashboard,
		authenticatedUser: state.services.authenticatedUser
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getEnrolledCourses: (userId) => dispatch(getEnrolledCourses(userId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StudentDashboard);