import React, { Component } from 'react';
import { fetchNews } from '../services/actions'
import { connect } from 'react-redux'

class NewsFeed extends Component {
	
	componentDidMount(){
        // temporary test data to check networking
        this.props.fetchNews()
    }

	render() {
		return (
			<div>
				{JSON.stringify(this.props.newsEntries)}
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	let { newsEntries } = state.viewsReducer.public.homeReducer
	return {
		newsEntries
	}
	
}

// add propTypes

export default connect(
	mapStateToProps,
	{
		fetchNews
	}
)(NewsFeed)