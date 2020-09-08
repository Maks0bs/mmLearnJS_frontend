import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

/**
 * Displays one news entry about a certain course.
 * Displays each entry differently according to its type
 * @memberOf components.views.classroom.Dashboard.DashboardNews
 * @component
 */
class DashboardNewsEntry extends Component {
    render() {
        let { kind, courseId, oldName, newName, newAbout, timeString,
            courseName, newEntries, deletedEntries
        } = this.props;
        switch(kind){
            case 'UpdateNewInfo': {
                return (
                    <div>
                        <h4>
                            Course { }
                            <Link to={`/classroom/course/${courseId}`}>
                                {oldName}
                            </Link>
                            { } has updated some info:
                        </h4>
                        <p>New name: {newName}</p>
                        <p>New info about the course: {newAbout}</p>
                        <i>{timeString}</i>
                    </div>
                )
            }
            case 'UpdateNewEntries': {
                return (
                    <div>
                        <h4>
                            New entries have been added to course { }
                            <Link to={`/classroom/course/${courseId}`}>
                                {courseName}
                            </Link> { }
                        </h4>
                        <ul>
                            {newEntries.map((entry, j) => {
                                return (
                                    <li key={j}>
                                        <p>{`New ${entry.type} "${entry.name}"`}</p>
                                    </li>
                                )
                            })}
                        </ul>
                        <i>{timeString}</i>
                    </div>
                )
            }
            case 'UpdateDeletedEntries': {
                return (
                    <div>
                        <h4>
                            Entries have been removed from course { }
                            <Link to={`/classroom/course/${courseId}`}>
                                {courseName}
                            </Link> { }
                        </h4>
                        <ul>
                            {deletedEntries.map((entry, j) => {
                                return (
                                    <li key={j}>
                                        <p>{`Removed ${entry.type} "${entry.name}"`}</p>
                                    </li>
                                )
                            })}
                        </ul>
                        <i>{timeString}</i>
                    </div>
                )
            }
            default: {
                return (
                    <div>{kind}</div>
                )
            }
        }
    }
}
DashboardNewsEntry.propTypes = {
    deletedEntries: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        name: PropTypes.string
    })),
    'deletedEntries.type': PropTypes.string,
    'deletedEntries.name': PropTypes.string,
    newEntries: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        name: PropTypes.string
    })),
    'newEntries.type': PropTypes.string,
    'newEntries.name': PropTypes.string,
    courseName: PropTypes.string,
    timeString: PropTypes.string,
    newAbout: PropTypes.string,
    newName: PropTypes.string,
    oldName: PropTypes.string,
    courseId: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired
}
export default DashboardNewsEntry;