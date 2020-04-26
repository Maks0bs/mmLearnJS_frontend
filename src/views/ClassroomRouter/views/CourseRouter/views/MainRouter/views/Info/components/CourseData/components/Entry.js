import React, { Component } from 'react';
import { getStreamLink, getForumLink } from '../../../services/helpers'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

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
		let { type, name, content, description, courseData } = this.props;
		return (
			<div>
				<h4>{name}</h4>
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
                                    to={`/classroom/course/${courseData._id}/forum/${content._id}`}
                                >
                                    {JSON.stringify(content)}
                                </Link>

                            )
                    }
                })()}
			</div>
		);
	}
}

let mapStateToProps = (state) => {
    return {
        courseData: state.views.classroom.course.main.services.courseData
    }
}

export default connect(
    mapStateToProps
)(Entry);