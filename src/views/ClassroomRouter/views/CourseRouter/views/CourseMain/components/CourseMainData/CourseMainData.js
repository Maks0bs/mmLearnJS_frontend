import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Section from './components/Section'
import UserPreview from "../../../../../../../../components/reusables/UserPreview";
import SubscriptionButton from "./components/SubscriptionButton";

/**
 * This component briefly displays all relevant course information
 * to users who have access to view this data (students / teachers)
 * @memberOf components.views.classroom.course.CourseMain
 * @component
 */
class CourseMainData extends Component {

	render() {
		let course = this.props.course;
		let { name, teachers, sections, exercises } = course;
		return (
			<div>
				<h1>
					{name}
					<SubscriptionButton />
				</h1>
				<ul style={{ listStyleType: 'none' }}>
					<li>
						{(!Array.isArray(teachers) || teachers.length === 0) ? (
							<i>No info about teachers</i>
						) : (
							<h2><i>Teachers:</i></h2>
						)}
						<ul style={{ listStyleType: 'none'}}>
							{Array.isArray(teachers) && teachers.map((teacher, i) => (
								<li key={i}> <UserPreview {...teacher}/> </li>
							))}
						</ul>
					</li>
					<hr style={{borderWidth: '5px'}}/>
					<li>
						{(!Array.isArray(sections) || sections.length === 0) ? (
							<i>No info about sections</i>
						) : (
							<h2><i>Sections:</i></h2>
						)}
						<ul style={{ listStyleType: 'none' }}>
							{Array.isArray(sections) && sections.map((section, i) => (
								<li key={i}>
									<hr />
									<Section sectionNum={i}/>
								</li>
							))}
						</ul>
					</li>
					<hr style={{borderWidth: '5px'}}/>
					<li>
						{(!Array.isArray(exercises) || exercises.length === 0) ? (
							<i>No info about exercises</i>
						) : (
							<h2><i>Exercises / tests:</i></h2>
						)}
						<ul>
							{Array.isArray(exercises) && exercises.map((exercise, i) => (
								<li key={i}>
									<h3>
										<Link to={
											`/classroom/course/${course._id}` +
											`/exercise/${exercise._id}`
										}>
											{exercise.name}
										</Link>
									</h3>
								</li>
							))}
						</ul>
					</li>
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
)(CourseMainData);