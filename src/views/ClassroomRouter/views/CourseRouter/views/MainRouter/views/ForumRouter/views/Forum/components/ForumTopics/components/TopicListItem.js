import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import User from "../../../../../../../../../../UserRouter/views/User/User";
import UserPreview from "../../../../../../../../../../../../../components/reusables/UserPreview";

class TopicListItem extends Component {
	render() {
		let { name, creator, _id, created } = this.props.topic;
		let { pathname: path } = this.props.location;
		let date = new Date(created);
		return (
		  	<tr>
		    	<td>
					<h5>
						<strong>
							<Link
								to={`${path}/topic/${_id}`}
							>
								{name}
							</Link>
						</strong>
					</h5>
		    	</td>
		    	<td>
		      		<UserPreview user={creator}/>
		    	</td>
		    	<td>
					On {date.toLocaleDateString()} at {date.toLocaleTimeString()}
		    	</td>
		  	</tr>
		);
	}
}

export default withRouter(TopicListItem)