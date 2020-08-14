import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { v1 as uuidv1 } from 'uuid'
import Section from './components/Section'
import UserPreview from "../../../../../../../../../../components/reusables/UserPreview";
import SubscriptionActions from "./components/SubscriptionActions";

class CourseData extends Component {

	render() {
		let course = this.props.courseData;
		let { name, teachers, sections, exercises } = course;
		if (!sections){
			sections = [];
		}
		if (!exercises){
			exercises = []
		}
		if (!teachers){
			teachers = [];
		}
		return (
			<div>
				<h1>
					{name}
					<SubscriptionActions />
				</h1>

				<ul
					style={{
						listStyleType: 'none'
					}}
				>
					<li>
						<h2>Teachers:</h2>
						<ul
							style={{
								listStyleType: 'none'
							}}
						>
							{teachers.map((teacher, i) => (
								<li key={i}>
									<UserPreview user={teacher}/>
								</li>
							))}
						</ul>
					</li>
					<hr />
					<li>
						<h2>Sections:</h2>
						<ul
							style={{
								listStyleType: 'none'
							}}
						>
							{sections.map((section, i) => (
								<li key={i}>
									<Section
										name={section.name}
										entries={section.entries}
										description={section.description}
										courseId={course._id}
									/>
								</li>
							))}
						</ul>
					</li>
					<hr />
					<li>
						<h2>Exercises / tests:</h2>
						<ul>
							{exercises.map((exercise, i) => (
								<li key={i}>
									<h5>
										<Link to={`/classroom/course/${course._id}/exercise/${exercise._id}`}>
											{exercise.name}
										</Link>
									</h5>
								</li>
							))}
						</ul>
					</li>
				</ul>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main.services
	}
}

export default connect(
	mapStateToProps
)(CourseData);
