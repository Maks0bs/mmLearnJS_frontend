import React, { Component } from 'react';

class Entry extends Component {
	render() {
		let { name, type } = this.props;
		//switch type
		return (
			<div>
				<h4>{name}</h4>
				<p>{type}</p>
			</div>
		);
	}
}

export default Entry;