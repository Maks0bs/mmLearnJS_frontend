import React, { Component } from 'react';
import Cookies from 'js-cookie'
import { REACT_APP_API_URL } from '../../../constants'

class Main extends Component {

	// every time classroom pages are loaded
	// we send request to server with our cookies (http-only cookies)
	// then we get response with user data and new extended cookie

	state = {
		text: ''
	}


	componentDidMount(){
		fetch(`${REACT_APP_API_URL}/auth/test`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			credentials: 'include'
		})
		.then(res => res.json())
		.then(data => this.setState({
			text: JSON.stringify(data)
		}))
		.catch(err => console.log(err))
	}

	render() {
		console.log('cookies', Cookies.get())
		return (
			<div>
				{this.state.text}
			</div>
		);
	}
}

export default Main
