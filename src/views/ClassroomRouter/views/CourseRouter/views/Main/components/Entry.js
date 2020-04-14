import React, { Component } from 'react';
import { getStreamLink } from '../services/helpers'

class Entry extends Component {

	getDownloadElement = (id, name) => {
		let link = getStreamLink(id, name);
        return (
            <a
                href={link}
                download={name}
                target="_blank"
                style={{
                    color: 'blue'
                }}
            >
                {name}
            </a>
        )
	}

	render() {
		let { type, name, content, description } = this.props;
		return (
			<div>
				<h4>{name}</h4>
				{(() => {
                    switch(type) {
                        case 'text':
                            return(
                                <p>{content}</p>
                            )
                        case 'file':
                        	return this.getDownloadElement(content.id, content.originalname);
                    }
                })()}
			</div>
		);
	}
}

export default Entry;