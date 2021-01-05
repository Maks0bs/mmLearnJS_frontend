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
            courseName, newEntries, deletedEntries, newExercises,
            deletedExercises
        } = this.props;
        let formatEntryType = (kind) =>
            kind.substring(5).toLowerCase()
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
                if (!Array.isArray(newEntries)) return kind;
                return (
                    <div>
                        <h4>
                            New entries have been added to course { }
                            <Link to={`/classroom/course/${courseId}`}>
                                {courseName}
                            </Link> { }
                        </h4>
                        <ul>
                            {newEntries.map((entry, j) => (
                                <li key={j}>
                                    <p>{
                                        `New ${formatEntryType(entry.kind)} ` +
                                        `"${entry.name}"`
                                    }</p>
                                </li>
                            ))}
                        </ul>
                        <i>{timeString}</i>
                    </div>
                )
            }
            case 'UpdateDeletedEntries': {
                if (!Array.isArray(deletedEntries)) return kind;
                return (
                    <div>
                        <h4>
                            Entries have been removed from course { }
                            <Link to={`/classroom/course/${courseId}`}>
                                {courseName}
                            </Link> { }
                        </h4>
                        <ul>
                            {Array.isArray(deletedEntries) && deletedEntries.map((entry, j) => (
                                <li key={j}>
                                    <p>{
                                        `Removed ${formatEntryType(entry.kind)} ` +
                                        `"${entry.name}"`
                                    }</p>
                                </li>
                            ))}
                        </ul>
                        <i>{timeString}</i>
                    </div>
                )
            }
            case 'UpdateNewExercises': {
                if (!Array.isArray(newExercises)) return kind;
                return (
                    <div>
                        <h4>
                            New exercises have been added to course { }
                            <Link to={`/classroom/course/${courseId}`}>
                                {courseName}
                            </Link> { }
                        </h4>
                        <ul>
                            {newExercises.map((ex, j) => (
                                <li key={j}><p>{`${ex.name}`}</p></li>
                            ))}
                        </ul>
                        <i>{timeString}</i>
                    </div>
                )
            }
            case 'UpdateDeletedExercises': {
                if (!Array.isArray(deletedExercises)) return kind;
                return (
                    <div>
                        <h4>
                            Exercises have been removed from course { }
                            <Link to={`/classroom/course/${courseId}`}>
                                {courseName}
                            </Link> { }
                        </h4>
                        <ul>
                            {deletedExercises.map((ex, j) => (
                                <li key={j}>
                                    <p>{`"${ex.name}"`}</p>
                                </li>
                            ))}
                        </ul>
                        <i>{timeString}</i>
                    </div>
                )
            }
            default: {
                return (<div>{kind}</div>)
            }
        }
    }
}
DashboardNewsEntry.propTypes = {
    deletedEntries: PropTypes.arrayOf(PropTypes.shape({
        kind: PropTypes.string,
        name: PropTypes.string
    })),
    'deletedEntries.kind': PropTypes.string,
    'deletedEntries.name': PropTypes.string,
    newEntries: PropTypes.arrayOf(PropTypes.shape({
        kind: PropTypes.string,
        name: PropTypes.string
    })),
    'newEntries.kind': PropTypes.string,
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