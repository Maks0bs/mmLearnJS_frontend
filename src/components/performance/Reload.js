import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'


/**
 * Reloads the page, specified under {@link props.location.pathname.page}
 * or under {@link props.link}.
 * Unmounts the component on the current page, making the component call
 * {@link componentDidMount} when it gets loaded again
 *
 * @memberOf components.common
 * @component
 */
class Reload extends Component {

	state = {
		mounted: false
	}

	componentDidMount() {
		this.setState({
			mounted: true
		})
	}

	render() {
		if (this.state.mounted){
			return (
				<Redirect to={this.props.link || this.props.location.state.page} />
			)
		} else {
			return null;
		}
	}
}

Reload.propTypes = {
	/**
	 * The page that should actually be reloaded.
	 * The component redirects to this URL, when the component
	 * on this URL has been unmounted
	 */
	link: PropTypes.string
}

export default Reload