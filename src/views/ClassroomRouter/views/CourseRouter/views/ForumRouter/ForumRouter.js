import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import Topic from './views/Topic'
import Forum from './views/Forum'
import { connect } from 'react-redux'
import { cleanup } from './services/actions'
import { addNavItem, removeNavItem} from "../../../../../../services/routing/actions";
import BigLoadingCentered from "../../../../../../components/reusables/BigLoadingCentered";

/**
 * @namespace components.views.classroom.course.forum
 */

/**
 * This router is responsible for all pages
 * that contain forum data with the given id
 * @memberOf components.views.classroom.course.forum
 * @component
 */
class ForumRouter extends Component {
	componentWillUnmount() {
		this.props.removeNavItem('forum link')
		this.props.cleanup();
	}

	render() {
		let { course, forum, location, match } = this.props;
		if (!forum || !forum._id){
			return (<BigLoadingCentered />)
		}
		if (course && course._id && forum && forum._id){
			this.props.addNavItem({
				id: 'forum link',
				name: 'Forum "' + forum.name + '"',
				path: `/classroom/course/${course._id}/forum/${forum._id}`
			})
		}
		let { path } = match;
		return (
			<div>
				<Switch>
					<Route
						exact path={`${path}`}
						component={Forum}
					/>
					<Route
						exact path={`${path}/topic/:topicId`}
						render={() => {
							let [,,,,,,,topicId] = location.pathname.split('/');
							return (<Topic topicId={topicId}/>)
						}}
					/>
				</Switch>
			</div>
		);
	}
}
let mapStateToProps = (state) => ({
	...state.views.classroom.course.forum,
	course: state.views.classroom.course.services.course
})
let mapDispatchToProps = (dispatch) => ({
	addNavItem: (item) => dispatch(addNavItem(item)),
	removeNavItem: (id) => dispatch(removeNavItem(id)),
	cleanup: () => dispatch(cleanup())
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ForumRouter))