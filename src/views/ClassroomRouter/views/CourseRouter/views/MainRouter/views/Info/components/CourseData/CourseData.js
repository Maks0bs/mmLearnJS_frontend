import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { v1 as uuidv1 } from 'uuid'
import Section from './components/Section'
import UserPreview from "../../../../../../../../../../components/UserPreview";
import SubscriptionActions from "./components/SubscriptionActions";

class CourseData extends Component {

	render() {
		let course = this.props.courseData;
		let { name, teachers, sections, exercises } = course;
		if (!sections){
			//Update page if no sections 
			sections = [];
		}
		return (
			<div>
				<h1>{name}</h1>

				<SubscriptionActions />
				<div className="ml-4" >
					<h2>Teachers:</h2>
					<div className="ml-4" >
						{teachers.map((teacher, i) => (
							<div key={i}>
								<UserPreview user={teacher}/>
							</div>
						))}
					</div>
				</div>
				<div className="ml-4">
					<h2>Sections:</h2>
					<div className="ml-4">
		                {sections.map((section, i) => (
		                	<div key={i}>
		                        <Section 
		                            name={section.name}
		                            entries={section.entries}
		                            description={section.description}
		                            courseId={course._id}
		                        />
		                    </div>
		                ))}
		            </div>
				</div>
				<h2 className="mt-3">
					<strong>Exercises / tests:</strong>
				</h2>
				<div>
					{exercises.map((exercise, i) => (
						<div>
							<Link to={`/classroom/course/${course._id}/exercise/${exercise._id}`}>
								{exercise.name}
							</Link>
						</div>
					))}
				</div>
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
