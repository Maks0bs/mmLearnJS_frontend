import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

/**
 * /classroom redirects to /classroom/courses
 *
 * TODO still haven't figured out, what to put here, might put smth  later
 *
 * @memberOf components.views.classroom
 * @component
 */
class MainClassroom extends Component {
	render() {
		return (<Redirect to={`/classroom/courses`} />);
	}
}

export default MainClassroom
