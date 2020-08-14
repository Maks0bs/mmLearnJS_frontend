import React, { Component } from 'react';
import { getTopicFromForum, formatTopicPosts } from '../../services/helpers'
import { getEnrollmentStatus } from '../../../../../../services/helpers'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { answerTopicPost, deleteTopicPost } from '../../services/actions'
import UserPreview from "../../../../../../../../../../components/reusables/UserPreview";

class Topic extends Component {
	constructor(){
		super();

		this.state = {
			replyTo: null,
			replyText: '',
			reload: false
		}
	}

	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		})
	}

	handleReplyClick = (index) => {
		if (index === this.state.replyTo){
			this.setState({
				replyTo: null,
				replyText: ''
			})
		} else {
			this.setState({
				replyTo: index
			})
		}
	}

	onSubmitAnswer = (e, postId) => {
		e.preventDefault();
		let { replyText } = this.state;
		this.props.answerTopicPost(
			this.props.courseData._id,
			this.props.forumData._id,
			this.props.match.params.topicId,
			postId,
			replyText
		)
		.then(() => {
			this.setState({
				reload: true
			})
		})
	}

	onDeletePost = (e, postId) => {
		e.preventDefault();
		this.props.deleteTopicPost(
			this.props.courseData._id,
			this.props.forumData._id,
			this.props.match.params.topicId,
			postId
		)
		.then(() => {
			this.setState({
				reload: true
			})
		})
	}

	render() {
		if (this.state.reload){
			return (
				<Redirect
					to={{
						pathname: '/reload',
						state: {
							page: this.props.location.pathname
						}
					}}
				/>
			)
		}

		let status = getEnrollmentStatus(this.props.courseData, this.props.authenticatedUser);
		let topic = getTopicFromForum(this.props.forumData.content, this.props.match.params.topicId);

		if (!topic){
			return (
				<Redirect to={`/classroom/course/${this.props.courseData._id}/forum/${this.props.forumData._id}`} />
			)
		}

		let posts = formatTopicPosts(topic.posts);

		return (
			<div className="m-3">
				{posts.map((post, i) => (
					<div key={i}>
						<div
							style={{
								marginTop: '10px',
								marginLeft: `${30 * post.depth}px`,
								position: 'relative',
								borderStyle: 'solid',
							}}
						>
							<div 
								style={{
									padding: '10px'
								}}
							>
								<h5>
									<UserPreview user={post.data.creator}/>
								</h5>
								<p>{post.data.content}</p>
								
								
							</div>

							

							<div
								style={{
									position: 'absolute',
									bottom: 0,
									right: 0,
									marginRight: '',
									padding: '10px',
									color: 'blue',
									cursor: 'pointer',
									':hover': {
										color: 'red'
									}
								}}
							>

								{(() => {
									if (
										status === 'enrolled' &&
										this.props.authenticatedUser._id === post.data.creator._id &&
										(!post.data.answers || post.data.answers.length === 0)
									){
										return (
											<a
												style={{
													color: 'red'
												}}
												onClick={(e) => this.onDeletePost(e, post.data._id)}
											>
												Delete post
											</a>
										)
									} else if (status === 'teacher' || status === 'creator'){
										if (!post.data.answers || post.data.answers.length === 0){
											return (
												<a
													style={{
														color: 'red'
													}}
													onClick={(e) => this.onDeletePost(e, post.data._id)}
												>
													Delete post
												</a>
											)
										} else if (post.data.answers.length > 0){
											return (
												<a
													style={{
														color: 'red'
													}}
													onClick={(e) => this.onDeletePost(e, post.data._id)}
												>
													Delete post tree
												</a>
											);
										}
									}
								})()}

								{(() => {
									if (!(status === 'teacher' || status === 'creator') && 
										this.props.forumData.content.teachersOnly === true
									){
										return null;
									} else return (
										<a
											className="ml-3"
											onClick={(e) => this.handleReplyClick(i)}
										>
											Answer
										</a>
									)
								})()}
							</div>
							
							
						</div>
						{this.state.replyTo === i && (
							<form
								style={{
									marginLeft: `${20 * post.depth}px`,
									marginTop: '10px',
									borderStyle: 'solid',
									padding: '10px',
									borderColor: 'blue'
								}}
								onSubmit={(e) => this.onSubmitAnswer(e, post.data._id)}
							>
								<div className="form-group">
									<label className="text-muted">Response</label>
									<textarea 
										onChange={this.handleChange("replyText")}
										type="text" 
										className="form-control"
										value={this.state.replyText}
									/>
								</div>

								<button 
									className="btn btn-raised btn-outline"
									type="submit"
								>
									Submit
								</button>
							</form>
						)}
					</div>
				))}
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		authenticatedUser: state.services.authenticatedUser,
		...state.views.classroom.course.main.forum,
		...state.views.classroom.course.main.services
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		answerTopicPost: (courseId, forumId, topicId, postId, post) => 
			dispatch(answerTopicPost(courseId, forumId, topicId, postId, post)),
		deleteTopicPost: (courseId, forumId, topicId, postId) => 
			dispatch(deleteTopicPost(courseId, forumId, topicId, postId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)
(withRouter(Topic));