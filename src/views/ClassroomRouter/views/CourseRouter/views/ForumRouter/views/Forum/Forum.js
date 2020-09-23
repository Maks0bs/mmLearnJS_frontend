import React, { Component } from 'react';
import { connect } from 'react-redux'
import TopicListItem from "./components/TopicListItem";
import {hideModal, showModal} from "../../../../../../../../components/ModalRoot/services/actions";
import NewTopic from "./components/NewTopic";
import { COURSE_USER_STATUS } from "../../../../services/helpers";

/**
 * Displays all relevant info about a forum (topics and actions)
 * @memberOf components.views.classroom.course.forum
 * @component
 */
class Forum extends Component {
	showAddTopicModal = (e) => {
		e.preventDefault();
		this.props.showModal(
			<NewTopic onClose={this.props.hideModal} />
		)
	}

	render(){
		let { TEACHER, CREATOR } = COURSE_USER_STATUS;
		let { curUserCourseStatus: status, forum } = this.props;
		let isTeacher = ((status === TEACHER) || (status === CREATOR))
		// TODO get rid of content here
		let { content, name } = forum;
		let { topics, teachersOnly, description } = content;
		return (
			<div className="container my-3">
				<h1>Forum <strong>{name}</strong> </h1>
				<p>{description}</p>
				{(!teachersOnly || isTeacher) && (
					<button
						className="btn btn-outline btn-raised m-3"
						onClick={this.showAddTopicModal}
						type="button"
					>
						New topic
					</button>
				)}
				<table className="table" style={{background: '#eeeeee'}}>
					<thead>
					<tr>
						<th scope="col">Topic</th>
						<th scope="col">Created by</th>
						<th scope="col">Created</th>
					</tr>
					</thead>
					<tbody>
					{Array.isArray(topics) && topics.map((topic, i) => (
						<TopicListItem topicNum={i} key={i}/>
					))}
					</tbody>
				</table>
			</div>
		)
	}
}
let mapStateToProps = (state) => ({
	...state.views.classroom.course.services,
	...state.views.classroom.course.forum,
	...state.services
})
let mapDispatchToProps = (dispatch) => ({
	showModal: (component) => dispatch(showModal(component)),
	hideModal: () => dispatch(hideModal())
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Forum);