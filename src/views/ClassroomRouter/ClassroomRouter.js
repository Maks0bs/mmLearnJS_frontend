import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import ClassroomMenu from './components/ClassroomMenu'
import Main from './views/Main'
import { extendSession } from '../../services/actions'
import { connect } from 'react-redux'

class ClassroomRouter extends Component {
	render() {
		//this.props.extendSession();//might have to make synchronous
		let { path } = this.props.match;
		return (
			<div>
				<ClassroomMenu />
				{JSON.stringify(this.props.user)}
				<Switch>
					<Route
						exact path={`${path}`}
						component={Main}
					/>
				</Switch>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.services
	}
}

export default connect(
	mapStateToProps,
	{ extendSession }
)(ClassroomRouter);
