import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTeacherCourses } from '../../services/actions'

class TeacherDashboard extends Component {
	constructor(props){
		super(props);

		this.state = {
			redirectToCreateCourse: false
		}
	}

	handleCreateCourse = () => {
		this.setState({
			redirectToCreateCourse: true
		})
	}

	componentDidMount(){
		this.props.getTeacherCourses(this.props.authenticatedUser._id);
	}

	render() {
		let { redirectToCreateCourse } = this.state;
		if (redirectToCreateCourse){
			return (
				<Redirect to="/classroom/create-course" />
			)
		}

		let { teacherCourses: courses} = this.props
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
				<h1>Teacher courses: </h1>
				{coursesList}
				<button
					className="btn btn-outline my-sm-0"
					onClick={this.handleCreateCourse}
				>
					Create new course
				</button>
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
		getTeacherCourses: (userId) => dispatch(getTeacherCourses(userId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TeacherDashboard);