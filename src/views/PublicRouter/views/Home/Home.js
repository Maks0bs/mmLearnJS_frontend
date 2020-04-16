import React, { Component } from 'react';
import NewsFeed from './components/NewsFeed'
import { Link } from 'react-router-dom'
import { REACT_APP_API_URL } from '../../../../constants'

class Home extends Component {

	state = {
		file: null
	}

	onSubmit = (e) => {
		e.preventDefault();
		let { file } = this.state;
		let form = new FormData();
		form.append('files', file);
		form.set('json', JSON.stringify({
			t1: 'entry1',
			t2: 'wow ong',
			t3: 456
		}))

		return fetch(`${REACT_APP_API_URL}/courses/testingroute`, {
			method: "POST",
			headers: {
				Accept: "application/json"
			},
			credentials: 'include',
			body: form
		})
		.then(res => res.json())
		.then(data => {
			return console.log('data received from testingroute', data);
		})
	}

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
	            <hr />
	            <hr />
	            <form onSubmit={this.onSubmit}>
	            	<div className="custom-file mb-3">
                        <input 
                            type="file"
                            onChange={(e) => {
                            	e.preventDefault();
                            	this.setState({
                            		file: e.target.files[0]
                            	}
                        	)}}
                        />
                    </div>
                    <button 
	                    className="btn btn-outline btn-raised btn-success ml-3"
	                    type="submit"
	                >
	                    submit
	                </button>
	            </form>

	        </div>
        );
    }
}

export default Home