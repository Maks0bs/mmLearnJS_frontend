import React, { Component } from 'react';

class CreatorActions extends Component {
	render() {
		return (
			<div>
				<h1>Creator actions:</h1>
				<button 
					className="btn btn-raised btn-outline btn-warning ml-3"
					type="submit"
				>
					Add teachers
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

export default CreatorActions;
