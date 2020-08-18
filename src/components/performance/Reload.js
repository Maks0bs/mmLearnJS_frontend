import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import PropTypes from "prop-types";

/**
 * instead of window.reload or
 * history.push(...) I use this all over the app
 * IMHO this is a better solution, it unmounts the
 * component we want to reload, which is helpful
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
				<Redirect to={this.props.location.state.page} />
			)
		} else {
			//return null;
			return (
				<Redirect to={this.props.location.state.page} />
			)
		}
	}
}

export default Reload