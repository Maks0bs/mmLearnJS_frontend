import React, { Component } from 'react';
import { connect } from 'react-redux'
import UserPreview from "../../../../../../../components/reusables/UserPreview";

/**
 * This component displays basic data about the course
 * for non-enrolled users
 * @memberOf components.views.classroom.course.CourseMain
 * @component
 */
class OpenCourseInfo extends Component {
	render() {
		let { about, name, teachers } = this.props.course;
		return (
			<div>
				<h1>{name}</h1>
				<ul  style={{listStyleType: 'none'}}>
					<h2>Teachers:</h2>
					<ul  style={{listStyleType: 'none'}}>
						{teachers.map((teacher, i) => (
							<li key={i}>
								<UserPreview {...teacher} />
							</li>
						))}
					</ul>
					<h2>About the course:</h2>
					<ul>
						<li>{about}</li>
					</ul>
				</ul>
			</div>
		);
	}
}
let mapStateToProps = (state) => ({
	...state.views.classroom.course.services
})
export default connect(
	mapStateToProps
)(OpenCourseInfo);
