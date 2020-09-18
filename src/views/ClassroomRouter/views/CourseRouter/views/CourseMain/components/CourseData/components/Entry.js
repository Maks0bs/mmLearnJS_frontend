import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {REACT_APP_API_URL} from "../../../../../../../../../constants";

class Entry extends Component {

	getDownloadElement = (id, name) => {
		let link = `${REACT_APP_API_URL}/files/stream/${id}/${name}`
        return (
            <a
                href={link}
                download={name}
                target="_blank"
            >
                File: {name}
            </a>
        )
	}



	render() {
		let { type, name, content, description, access, courseData, id, courseId } = this.props;
		return (
			<div className="mt-3">
				<h4> <strong> {name} </strong> </h4>
                <div className="ml-3">
                    {(() => {
                        if (access !== 'students'){
                            return (
                                <p 
                                    style={{
                                        color: 'red'
                                    }}
                                >
                                    Not visible to students
                                </p>
                            )
                        } else return null;
                    })()}
    				{(() => {
                        switch(type) {
                            case 'text':
                                return(
                                    <p>{content.text}</p>
                                )
                            case 'file':
                            	return this.getDownloadElement(content.id, content.originalname);
                            case 'forum':
                                return (
                                    <Link
                                        to={`/classroom/course/${courseId}/forum/${id}`}
                                    >
                                        Forum: {name}
                                    </Link>

                                )
                        }
                    })()}
                </div>
			</div>
		);
	}
}


export default Entry;