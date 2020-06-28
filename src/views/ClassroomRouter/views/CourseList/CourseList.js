import React, { Component } from 'react';
import { connect } from 'react-redux'
import MainDashboard from './components/MainList'
import StudentDashboard from './components/StudentList'
import TeacherDashboard from './components/TeacherList'


class CourseList extends Component {
	render() {
		let { authenticatedUser: user } = this.props;
		return (
			<div className="container">
				{user && user._id && user.role === 'teacher' && (
					<TeacherDashboard />
				)}
				{user && user._id && (
					<StudentDashboard className="mt-5"/>
				)}

				<MainDashboard />
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		authenticatedUser: state.services.authenticatedUser
	}
}

export default connect(
	mapStateToProps,
	null
)(CourseList)