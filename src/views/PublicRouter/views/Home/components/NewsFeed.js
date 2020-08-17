import React, { Component } from 'react';
import { fetchNews, cleanup } from '../services/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class NewsFeed extends Component {
	
	componentDidMount(){
        this.props.fetchNews()
    }

    componentWillUnmount() {
		this.props.cleanup();
	}

	render() {
		return (
			<div>
				<h1>Welcome to mmLearnJS</h1>
				<ul>
					{this.props.newsEntries.map((e, i) => (
						<li
							key={i}
						>
							<p>
								{e.message}
							</p>
						</li>
					))}
				</ul>
				
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	let { newsEntries } = state.views.public.home
	return {
		newsEntries
	}
	
}

let mapDispatchToProps = (dispatch) => {
	return {
		fetchNews: () => dispatch(fetchNews()),
		cleanup: () => dispatch(cleanup())
	}
}

NewsFeed.propTypes = {
	newsEntries: PropTypes.arrayOf(
		PropTypes.shape({
			message: PropTypes.string
		})
	)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewsFeed)