import React, { Component } from 'react';
import { connect } from 'react-redux'
import TopicListItem from './components/TopicListItem'

class ForumTopics extends Component {
	render() {
		let { content } = this.props.forumData;
		let { topics } = content;
		return (
			<div className="m-3">
				<table 
					className="table"
					style={{
						background: '#eeeeee'
					}}
				>
					<thead>
						<tr>
							<th scope="col">Topic</th>
							<th scope="col">Created by</th>
							<th scope="col">Info</th>
						</tr>
					</thead>
					<tbody>
						{topics.map((topic, i) => (
							<TopicListItem
								topic={topic}
								key={i}
							/>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main.forum
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)
(ForumTopics);