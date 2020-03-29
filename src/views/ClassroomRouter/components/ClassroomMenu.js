import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

class ClassroomMenu extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand navbar-light bg-light">
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link 
							className="nav-link"
							to="/classroom"
						>
							Classroom
						</Link>
					</li>
				</ul>
		        <ul className="navbar-nav ml-auto">
		            <li className="nav-item">
		                <a className="nav-link">Home <span className="sr-only">(current)</span></a>
		            </li>
		            
		        </ul>
			</nav>
		);
	}
}

export default withRouter(ClassroomMenu)