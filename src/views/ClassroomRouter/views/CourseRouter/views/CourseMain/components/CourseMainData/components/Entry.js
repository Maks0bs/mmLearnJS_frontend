import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {REACT_APP_API_URL} from "../../../../../../../../../constants";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { faFile, faComments } from "@fortawesome/free-solid-svg-icons";

/**
 * This component displays information about one single course entry
 * @memberOf components.views.classroom.course.CourseMain.CourseMainData.Section
 * @component
 */
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
		let { entryNum, sectionNum, course } = this.props;
		let entry = course.sections[sectionNum].entries[entryNum];
		let { access, kind, name, _id } = entry;
		return (
			<div className="mt-3">
				<span style={{display: 'flex', alignItems: 'center', flexFlow: 'row wrap'}}>
					<h4> <strong> {name} </strong> </h4>
					{access !== 'students' && (
						// this note gets displayed only to teachers
						// because students simply wouldn't receive
						// the entry which they don't have access to from the api
						<span
							className="mx-2 my-0"
							style={{color: 'red'}}
						>
							(Not visible to students)
						</span>
					)}
				</span>

                <div className="ml-3">

    				{(() => {
                        switch(kind) {
                            case 'EntryText':
                                return(<p>{entry.text}</p>)
                            case 'EntryFile':
                            	return (
                            		<h5>
										<a
											href={
												`${REACT_APP_API_URL}/files/stream/`+
												`${entry.file}/${entry.fileName}`
											}
											download={entry.fileName}
											target="_blank"
										>
											<Icon className="pr-1" icon={faFile}/>
											{entry.fileName}
										</a>
									</h5>
								)
                            case 'EntryForum':
                                return (
                                	<h5>
										<Link to={
											`/classroom/course/${course._id}` +
											`/forum/${entry.forum._id}`
										}>
											<Icon className="pr-1" icon={faComments}/>
											{name}
										</Link>
									</h5>
                                )
                        }
                    })()}
                </div>
			</div>
		);
	}
}
Entry.propTypes = {
	sectionNum: PropTypes.number.isRequired,
	entryNum: PropTypes.number.isRequired
}
let mapStateToProps = (state) => ({
	...state.views.classroom.course.services
})
export default connect(
	mapStateToProps
)(Entry);