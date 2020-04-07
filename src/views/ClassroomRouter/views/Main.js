import React, { Component } from 'react';
import { REACT_APP_API_URL } from '../../../constants'

class Main extends Component {

	// every time classroom pages are loaded
	// we send request to server with our cookies (http-only cookies)
	// then we get response with user data and new extended cookie

	state = {
		text: ''
	}

	render() {
		return (
			<div>
				{this.state.text}
			</div>
		);
	}
}

export default Main
