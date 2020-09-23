import React, { Component } from 'react';
import Entry from './Entry'
import PropTypes from "prop-types";
import {connect} from "react-redux";

/**
 * This component displays information about one single course section
 * @memberOf components.views.classroom.course.CourseMain.CourseMainData
 * @component
 */
class Section extends Component {
	render() {
		let { sectionNum, course} = this.props;
        let { name, description, entries } = course.sections[sectionNum];
		return (
			<div>
				<h3> <strong> <u> {name} </u> </strong> </h3>
                <p>{description}</p>
                <ul style={{listStyleType: 'none'}}>
	                {Array.isArray(entries) && entries.map((entry, i) => (
						<li key={i}>
							{entry ? (
								<Entry
									sectionNum={sectionNum}
									entryNum={i}
								/>
							) : (
								<i style={{color: 'red'}}>Problem with entry</i>
							)}
						</li>
					))}
	            </ul>
			</div>
		);
	}
}
Section.propTypes = {
	sectionNum: PropTypes.number.isRequired
}
let mapStateToProps = (state) => ({
	...state.views.classroom.course.services
})
export default connect(
	mapStateToProps
)(Section);