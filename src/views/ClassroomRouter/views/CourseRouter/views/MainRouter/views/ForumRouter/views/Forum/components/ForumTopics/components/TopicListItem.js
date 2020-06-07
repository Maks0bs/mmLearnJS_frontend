import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'

class TopicListItem extends Component {
	render() {
		let { name, creator, _id } = this.props.topic;
		let { pathname: path } = this.props.location;
		return (
		  	<tr>
		    	<td>
		      		<Link
		      			to={`${path}/topic/${_id}`}
		      		>
		      			{name}
		      		</Link>
		    	</td>
		    	<td>
		      		<Link
		      			to={`/classroom/user/${creator}`}
		      		>
		      			{creator}
		      		</Link>
		    	</td>
		    	<td>
		      		Some actions to do
		    	</td>
		  	</tr>
		);
	}
}

export default withRouter(TopicListItem)