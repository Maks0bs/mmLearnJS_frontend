import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getOpenCourses } from '../../services/actions'

class MainDashboard extends Component {

	componentDidMount(){
		this.props.getOpenCourses();
	}

	render() {
		let { openCourses: courses } = this.props;
		if (!courses){
			courses = [];
		}
		let coursesList = [];
		for (let i = 0;  i < courses.length; i++){
			coursesList.push(
				<div key={i}>
					<Link
						to={`/classroom/course/${courses[i]._id}`}
					>
						{courses[i].name}
					</Link>
				</div>
			)
		}
		return (
			<div className={this.props.className}>
				<h1>Open courses:</h1>
				{coursesList}
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.dashboard
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getOpenCourses: () => dispatch(getOpenCourses())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainDashboard);