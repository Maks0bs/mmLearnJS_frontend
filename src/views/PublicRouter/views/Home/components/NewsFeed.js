import React, {Component} from 'react';
import { fetchNews, cleanup } from '../services/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import OptimizedComponent from "../../../../../components/performance/OptimizedComponent";

/**
 * This component fetches and displays the news of mmLearnJS on the home page
 *
 * @memberOf components.views.public.Home
 * @component
 */
class NewsFeed extends Component {
	
	componentDidMount(){
        this.props.fetchNews()
    }

    componentWillUnmount() {
		this.props.cleanup();
	}

	render() {
		let { newsEntries } = this.props;
		return (
			<div>
				<h1>Welcome to mmLearnJS</h1>
				<ul>
					{newsEntries && newsEntries.map((e, i) => (
						<li key={i}>
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

let mapStateToProps = (state) => ({
	...state.views.public.home
})
let mapDispatchToProps = (dispatch) => ({
	fetchNews: () => dispatch(fetchNews()),
	cleanup: () => dispatch(cleanup())
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewsFeed)