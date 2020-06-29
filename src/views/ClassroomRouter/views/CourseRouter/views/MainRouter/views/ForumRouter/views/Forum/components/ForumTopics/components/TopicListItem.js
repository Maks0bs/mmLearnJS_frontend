import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import User from "../../../../../../../../../../UserRouter/views/User/User";
import UserPreview from "../../../../../../../../../../../../../components/UserPreview";

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
		      		<UserPreview user={creator}/>
		    	</td>
		    	<td>
		      		Description...
		    	</td>
		  	</tr>
		);
	}
}

export default withRouter(TopicListItem)