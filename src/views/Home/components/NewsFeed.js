import React, { Component } from 'react';
import { getData } from '../services/api'

class NewsFeed extends Component {
	constructor(props){
		super(props);

		this.state = {
			text: ''
		}
	}

	componentDidMount(){
        // temporary test data to check networking
        getData()
        .then((data) => {
            this.setState({
                text: JSON.stringify(data)
            })
        })
    }

	render() {
		return (
			<div>
				{this.state.text}
			</div>
		);
	}
}

export default NewsFeed;