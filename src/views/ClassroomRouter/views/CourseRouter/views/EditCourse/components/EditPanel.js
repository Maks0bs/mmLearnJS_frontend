import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { v1 as uuidv1 } from 'uuid'
import { editCourse } from '../services/actions'

class EditPanel extends Component {

	renderEntry = ({ type, name, content, description }, key) => {

		//switch( type ){}

		return (
			<div key={key}>
				<h4>{name}</h4>
				<p className="ml-4">{JSON.stringify(content)}</p>
			</div>
		)
	}

	renderSection = ({ name, description, entries }, key) => {
		let entriesList = []
		for (let i of entries) {
			entriesList.push(
				this.renderEntry(i, uuidv1())
			)
		}
		return (
			<div key={key}>
				<div className="ml-4">
					<h3>{name}</h3>
					<p className="ml-5">{description}</p>
				</div>
				
				<div className="ml-5">
					{entriesList}
				</div>

			</div>
		)
	}

	render() {
		/*let course = this.props.courseData;
		let { name, teachers } = course;
		let sectionsList = []
		for (let i of course.sections) {
			sectionsList.push(
				this.renderSection(i, uuidv1())
			)
		}
		return (
			<div>
				<h1>{name}</h1>
				<div className="ml-4">
					<h2>Teachers:</h2>
					<p className="ml-3">{JSON.stringify(teachers)}</p>
				</div>
				<div className="ml-4">
					<h2>Sections:</h2>
					<div className="ml-3">
						{sectionsList}
					</div>
				</div>
			</div>
		);*/
		return (
			<div>
				
				{JSON.stringify(this.props.oldCourseData)}
			</div>
		)
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.edit
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		editCourse: () => dispatch(editCourse())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditPanel);
