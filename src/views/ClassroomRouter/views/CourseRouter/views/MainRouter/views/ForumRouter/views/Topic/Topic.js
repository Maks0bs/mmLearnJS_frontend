import React, { Component } from 'react';
import { getTopicFromForum, formatTopicPosts } from '../../services/helpers'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { answerTopicPost } from '../../services/actions'

class Topic extends Component {
	constructor(){
		super();

		this.state = {
			replyTo: null,
			replyText: ''
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
	}

	render() {
		let topic = getTopicFromForum(this.props.forumData.content, this.props.match.params.topicId);

		let posts = formatTopicPosts(topic.posts);
		return (
			<div className="m-3">
				{posts.map((post, i) => (
					<div key={i}>
						<div
							style={{
								marginTop: '10px',
								marginLeft: `${30 * post.depth}px`,
								display: 'flex',
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
									By { }
									<Link to={`/classroom/user/${post.data.creator}`}>
										{post.data.creator}
									</Link>
								</h5>
								<p>{post.data.content}</p>
								
								
							</div>
							
							<a
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
								onClick={(e) => this.handleReplyClick(i)}
							>
								Answer
							</a>
							
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
		...state.views.classroom.course.main.forum,
		...state.views.classroom.course.main.services
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		answerTopicPost: (courseId, forumId, topicId, postId, post) => 
			dispatch(answerTopicPost(courseId, forumId, topicId, postId, post))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)
(Topic);