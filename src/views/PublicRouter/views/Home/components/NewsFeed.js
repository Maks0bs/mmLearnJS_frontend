import React from 'react';
import { fetchNews, cleanup } from '../services/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import OptimizedComponent from "../../../../../components/performance/OptimizedComponent";
import SmallLoading from "../../../../../components/reusables/SmallLoading";

class NewsFeed extends OptimizedComponent {
	
	componentDidMount(){
		this.startLoading()
        this.props.fetchNews()
			.then(() => {
				this.stopLoading();
			})
    }

    componentWillUnmount() {
		this.props.cleanup();
	}

	render() {
		console.log('render news feed');
		let { newsEntries } = this.props;
		return (
			<div>
				<h1>Welcome to mmLearnJS</h1>
				<ul>
					{newsEntries && newsEntries.map((e, i) => (
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