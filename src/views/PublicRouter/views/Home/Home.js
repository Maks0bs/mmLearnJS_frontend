import React, { Component } from 'react';
import NewsFeed from './components/NewsFeed'

/**
 * The home page of mmLearnJS. It is displayed to the user when
 * they first enter the website through a direct link.
 * Sometimes users might be redirected here (e. g. on log out)
 *
 * @memberOf components.views.public
 * @component
 */
class Home extends Component {

    render() {
        return (
        	<div className="container my-3">
	            <div className="row">
		            <div className="col md-auto">
		                <NewsFeed />
		            </div>
					<h1>
						<span style={{color: 'red'}}>mm</span>
						<span style={{color: 'green'}}>Learn</span>
						<span style={{color: '#b0cf19'}}>JS</span>
					</h1>
	            </div>
	        </div>
        );
    }
}

export default Home