import React, { Component } from 'react';

class TeacherActions extends Component {
	render() {
		return (
			<div>
				<h1>Teacher actions:</h1>
				<button 
					className="btn btn-raised btn-outline btn-warning ml-3"
					type="submit"
				>
					Edit course
				</button>

				<button 
					className="btn btn-raised btn-outline btn-danger ml-3"
					type="submit"
				>
					Delete course
				</button>
			</div>
		);
	}
}

export default TeacherActions;
