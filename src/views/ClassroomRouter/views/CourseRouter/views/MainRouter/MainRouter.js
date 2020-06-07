import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Info from './views/Info'
import ForumRouter from './views/ForumRouter'
import { connect } from 'react-redux'
import { getCourseById } from './services/actions'
import _ from 'lodash'


class MainRouter extends Component {
	constructor(){
		super();

		this.upd = 0;
		this.state = {
			mounted: false
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (!_.isEqual(nextProps, this.props)){
			this.upd++;
			return true;
		}
		return (!_.isEqual(nextState, this.state) || !_.isEqual(nextProps, this.props)) 
	}

	componentDidMount() {
		this.setState({
			mounted: true
		})
	}


	render() {

		if (!this.state.mounted){
			return null;
		}


		this.upd++;
		console.log('!!!render', this.upd, this.props, this.state);
		if (this.upd % 2 == 1){
			this.props.getCourseById(this.props.match.params.courseId)
		}
		if (!this.props.courseData._id){
			return null;
		}
		let { path } = this.props.match;
		return (
			<div>
				<Switch>
					<Route
						exact path={`${path}/`}
						component={Info}
					/>
					
					<Route
						path={`${path}/forum/:forumId`}
						component={ForumRouter}
					/>
					
				</Switch>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main.services
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getCourseById: (courseId) => dispatch(getCourseById(courseId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainRouter)
