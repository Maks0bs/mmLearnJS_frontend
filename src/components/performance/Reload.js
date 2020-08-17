import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import PropTypes from "prop-types";

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