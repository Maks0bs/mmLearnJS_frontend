import React, { Component } from 'react';
import { getTopicFromForumContent, formatTopicPosts } from '../../services/helpers'
import { connect } from 'react-redux'
import { addNavItem, removeNavItem } from "../../../../../../../../services/routing/actions";
import { Link, Redirect, withRouter } from 'react-router-dom'
import { answerTopicPost, deleteTopicPost, getForumById } from '../../services/actions'
import {COURSE_USER_STATUS} from "../../../../services/helpers";
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import TopicPost from "./components/TopicPost";
import { addToast} from "../../../../../../../../components/ToastRoot/services/actions";
import PropTypes from 'prop-types';
import BigLoadingAbsolute from "../../../../../../../../components/reusables/BigLoadingAbsolute";

/**
 * Displays all data about a single forum topic
 * @memberOf components.views.classroom.course.forum
 * @component
 */
class Topic extends Component {
	constructor(props){
		super(props);
		this.state = { replyTo: null, replyText: '', loading: false }
	}

	componentWillUnmount() {
		this.props.removeNavItem('forum topic link')
	}

	handleReplyClick = (index) => {
		if (index === this.state.replyTo){
			this.setState({ replyTo: null})
		} else {
			this.setState({ replyTo: index })
		}
	}

	handleErrorAndUpdate = () => {
		if (this.props.error){
			this.props.addToast(
				(<div>{this.props.error}</div>),
				{type: 'error'}
			)
		}
		return this.props.getForumById(
			this.props.course._id, this.props.forum._id
		)
			.then(() => {
				this.setState({loading: false})
			})
	}

	onSubmitAnswer = (postId, replyText) => {
		this.setState({loading: true})
		return this.props.answerTopicPost(
			this.props.course._id, this.props.forum._id,
			this.props.topicId,
			postId, replyText
		)
			.then(() => {
				this.setState({ replyTo: null})
				this.handleErrorAndUpdate();
			})
	}

	onDeletePost = (postId) => {
		this.setState({loading: true})
		return this.props.deleteTopicPost(
			this.props.course._id, this.props.forum._id,
			this.props.topicId, postId
		)
			.then(() => this.handleErrorAndUpdate())
	}

	render() {
		let { TEACHER, CREATOR } = COURSE_USER_STATUS;
		let {
			curUserCourseStatus: status, course,
			authenticatedUser: user, forum, topicId
		} = this.props;
		let forumLink = `/classroom/course/${course._id}/forum/${forum._id}`;
		let topic = getTopicFromForumContent(forum.content, topicId);
		if (!topic){
			return (<Redirect to={forumLink} />)
		}
		this.props.addNavItem({
			id: 'forum topic link',
			name: 'Topic "' + forum.name + '"',
			path: `${forumLink}/topic/${topic._id}`
		})
		let posts = formatTopicPosts(topic.posts);
		let isTeacher = (status === TEACHER || status === CREATOR);
		let hasTeachersOnly = forum.content && forum.content.teachersOnly;

		return (
			<div className="m-3">
				{this.state.loading && (<BigLoadingAbsolute />)}
				<h1 className="text-center">Topic <strong>{topic.name}</strong> </h1>
				<Link to={forumLink} className="my-3" style={{color: 'gray'}}>
					<Icon icon={faArrowCircleLeft} className="pr-1" />
					Back to forum
				</Link>
				{Array.isArray(posts) && posts.map((post, i) => {
					if (!post.data) return (<div key={i}/>);
					let { data } = post;
					let isPostCreator = data.creator && (user._id === data.creator._id);
					let postHasNoAnswers = !data.answers || !data.answers.length;
					let canDelete = isTeacher || (isPostCreator && postHasNoAnswers);
					return (
						<TopicPost
							key={i}
							postId={data._id}
							postNum={i}
							canDelete={canDelete}
							hasAnswers={!postHasNoAnswers}
							canReply={isTeacher || !hasTeachersOnly}
							replying={this.state.replyTo === i}
							onSubmitAnswer={this.onSubmitAnswer}
							onDeletePost={this.onDeletePost}
							creator={data.creator}
							handleReplyClick={this.handleReplyClick}
							content={data.content}
							depth={post.depth}
						/>
					)
				})}
			</div>
		);
	}
}

let mapStateToProps = (state) => ({
	authenticatedUser: state.services.authenticatedUser,
	...state.views.classroom.course.forum,
	...state.views.classroom.course.services
})
let mapDispatchToProps = (dispatch) => ({
	answerTopicPost: (courseId, forumId, topicId, postId, post) =>
		dispatch(answerTopicPost(courseId, forumId, topicId, postId, post)),
	deleteTopicPost: (courseId, forumId, topicId, postId) =>
		dispatch(deleteTopicPost(courseId, forumId, topicId, postId)),
	addNavItem: (item) => dispatch(addNavItem(item)),
	removeNavItem: (id) => dispatch(removeNavItem(id)),
	getForumById: (courseId, forumId) => dispatch(getForumById(courseId, forumId)),
	addToast: (component, options) => dispatch(addToast(component, options))
})
Topic.propTypes = {
	topicId: PropTypes.number.isRequired
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Topic));