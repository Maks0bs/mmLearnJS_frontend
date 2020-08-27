import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Main extends Component {

	render() {
		return (
			<Redirect to={`/classroom/courses`} />
		);
	}
}

export default Main
