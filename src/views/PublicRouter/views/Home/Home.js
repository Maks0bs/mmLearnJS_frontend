import React, { Component } from 'react';
import NewsFeed from './components/NewsFeed'
import { Link, Redirect } from 'react-router-dom'

class Home extends Component {

    render() {
    	//styling is important!!!
        return (
        	<div className="container my-3">
	            <div className="row">
		            <div className="col md-auto">
		                <NewsFeed />
		            </div>
					{
						/*<div className="col col-md-auto">
							<Link
								className="btn btn-outline my-sm-0"
								to="/open-courses"
							>
								Open courses[To be implemented]
							</Link>
						</div>*/
					}
					<h1>
						<span
							style={{
								color: 'red'
							}}
						>
							mm
						</span>
						<span
							style={{
								color: 'green'
							}}
						>
							Learn
						</span>
						<span
							style={{
								color: '#b0cf19'
							}}
						>
							JS
						</span>
					</h1>
	            </div>

	        </div>
        );
    }
}

export default Home