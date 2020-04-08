import React, { Component } from 'react';

class TeacherActions extends Component {
	render() {
		return (
			<div>
				<h1>Teacher actions:</h1>
				<button 
					className="btn btn-raised btn-outline btn-info ml-3"
					style={{
						background: ''
					}}
					type="submit"
				>
					Edit course info
				</button>

				<button 
					className="btn btn-raised btn-outline btn-info ml-3"
					style={{
						background: ''
					}}
					type="submit"
				>
					Edit course content
				</button>
			</div>
		);
	}
}

export default TeacherActions;
