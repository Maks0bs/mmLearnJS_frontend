import React, { Component } from 'react';
import { connect } from 'react-redux'
import MainDashboard from './components/MainDashboard'
import StudentDashboard from './components/StudentDashboard'
import TeacherDashboard from './components/TeacherDashboard'


class Dashboard extends Component {
	render() {
		//show students dash only to logged in users
		let { authenticatedUser: user } = this.props;
		return (
			<div>
				<MainDashboard />
				{user && user._id && (
					<StudentDashboard className="mt-5"/>
				)}
				{user && user._id && user.role === 'teacher' && (
					<TeacherDashboard />
				)}
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
)(Dashboard)