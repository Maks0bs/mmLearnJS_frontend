import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import UserPreview from "../../../../../../../../../components/reusables/UserPreview";
import PropTypes from 'prop-types'
import {connect} from "react-redux";

/**
 * Displays all relevant info about a forum (topics and actions)
 * @memberOf components.views.classroom.course.forum.Forum
 * @component
 */
class TopicListItem extends Component {
	render() {
		let { forum, topicNum, course } = this.props;
		if (!forum || !Array.isArray(forum.topics)){
			return null;
		}
		let { name, creator, _id, created } = forum.topics[topicNum];

		let date = new Date(created);
		return (
		  	<tr>
		    	<td>
					<h5>
						<strong>
							<Link
								to={
									`/classroom/course/${course._id}` +
									`/forum/${forum._id}/topic/${_id}`
								}
							>
								{name}
							</Link>
						</strong>
					</h5>
		    	</td>
		    	<td>
					<UserPreview {...creator}/>
		    	</td>
		    	<td>
					On {date.toLocaleDateString()} { }
					at {date.toLocaleTimeString()}
		    	</td>
		  	</tr>
		);
	}
}

let mapStateToProps = (state) => ({
	...state.views.classroom.course.services,
	...state.views.classroom.course.forum
})
TopicListItem.propTypes = {
	topicNum: PropTypes.number.isRequired
}
export default connect(
	mapStateToProps
)(withRouter(TopicListItem));