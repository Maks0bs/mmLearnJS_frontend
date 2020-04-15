import React, { Component } from 'react';
import NewsFeed from './components/NewsFeed'
import { Link } from 'react-router-dom'
import { REACT_APP_API_URL } from '../../../../constants'

class Home extends Component {

    render() {
    	//styling is important!!!
        return (
        	<div className="container-fluid ml-0 mr-0">
	            <div className="row">
		            <div className="col md-auto">
		                <NewsFeed />
		            </div>
		            <div className="col col-md-auto">
	            		<Link 
	            			className="btn btn-outline my-sm-0"
	            			style={{
			        			backgroundColor: '#B3E5FC'
			        		}}
	            			to="/open-courses"
	            		>
	            			Open courses
	            		</Link>
		            </div>
	            </div>

	        </div>
        );
    }
}

export default Home