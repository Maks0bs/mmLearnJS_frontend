import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getOpenCourses } from '../../services/actions'

class MainDashboard extends Component {

	componentDidMount(){
		this.props.getOpenCourses();
	}

	render() {
		if (!this.props.openCourses){
			return null;
		}
		return (
			<div className={this.props.className}>
				<h1>Open courses:</h1>
				{this.props.openCourses.map((course, i) => (
					<div key={i}>
						<Link
							to={`/classroom/course/${course._id}`}
						>
							{course.name}
						</Link>
					</div>
				))}
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