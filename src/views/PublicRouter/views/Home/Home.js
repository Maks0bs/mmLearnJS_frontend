import React, { Component } from 'react';
import NewsFeed from './components/NewsFeed'
import { Link } from 'react-router-dom'
import { REACT_APP_API_URL } from '../../../../constants'

class Home extends Component {

	state = {
		file: null
	}

	componentDidMount(){
		this.data = new FormData();
	}

	handleChange = () => (e) => {
		console.log(e.target.files[0]);
		this.data.append('files', e.target.files[0])
		this.setState({
			file: URL.createObjectURL(e.target.files[0]),
			filename: e.target.files[0].name
		})
		console.log(this.file);
	}

	onSubmit = (e) => {
		e.preventDefault();
		fetch(`${REACT_APP_API_URL}/files/upload`, {
			method: "POST",
			headers: {
				Accept: "application/json"
			},
			credentials: 'include',
			body: this.data
		})
		.then(res => res.json())
		.then(data => console.log(data))
		.catch(err => console.log(err))
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
	            <form 
					onSubmit={this.onSubmit}
				>
					<div className="custom-file mb-3">
						<input 
							type="file"
							onChange={this.handleChange()}
						/>
					</div>
					<hr />
					<button 
						className="btn btn-outline"
						type="submit"
					>
						Submit
					</button>
				</form>
				<a
					href={this.state.file}
					download={this.state.filename}
				>
					click me
				</a>

	        </div>
        );
    }
}

export default Home