import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'

/**
 * This component displays basic info about an attempt as a row
 * Should be placed inside {@link tbody} or {@link table}
 * Normally used in
 * {@link components.views.classroom.course.exercise.ExercisePreview.StudentAttempt}
 * or {@link components.views.classroom.course.exercise.ExercisePreview.StudentPreview}
 * @memberOf components.views.classroom.course.exercise.ExercisePreview
 * @component
 */
class AttemptTableRow extends Component {
    render() {
        let { num, endTime, startTime, score, attemptLink } = this.props;
        let startDate = new Date(startTime),
            endDate = endTime ? new Date(endTime) : null
        let scoreNum = parseFloat(score);
        return (
            <tr>
                <td>
                    {num + 1}
                </td>
                <td>
                    {scoreNum || (scoreNum === 0) ? scoreNum.toFixed(2) : '-'}
                </td>
                <td>
                    <div>
                        <strong>Started</strong> {}
                        on {startDate.toLocaleDateString()} {}
                        at {startDate.toLocaleTimeString()}
                    </div>
                    {endDate ? (
                        <div>
                            <strong>Finished</strong> {}
                            on {endDate.toLocaleDateString()} {}
                            at {endDate.toLocaleTimeString()}
                        </div>
                    ) : (
                        <strong>Still running</strong>
                    )}
                </td>
                {attemptLink && (
                    <td>
                        <Link to={attemptLink}>
                            {endDate ? 'Review' : 'Continue attempt'}
                        </Link>
                    </td>
                )}

            </tr>
        );
    }
}
AttemptTableRow.propTypes = {
    /**Number of the attempt in an ordered list*/
    num: PropTypes.number.isRequired,
    /** {@link Date} format string that specifies the start of the attempt */
    startTime: PropTypes.string.isRequired,
    /** {@link Date} format string that specifies the end of the attempt */
    endTime: PropTypes.string,
    score: PropTypes.number,
    /**
     *  A link to review / continue the attempt.
     *  If true, this adds a fourth column to the row with the given link
     */
    attemptLink: PropTypes.string
}
export default AttemptTableRow;