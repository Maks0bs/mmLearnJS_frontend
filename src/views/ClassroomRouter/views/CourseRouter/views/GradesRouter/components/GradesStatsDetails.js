import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types'
/**
 * This component displays detailed information about the participation
 * of the given user in the given exercises. It displays
 * summary about all attempts.
 * @memberOf components.views.classroom.course.grades
 * @component
 */
class GradesStatsDetails extends Component {

    componentWillUnmount() {
        this.handleLeave();
    }

    handleLeave = () => this.props.onClose && this.props.onClose();

    render() {
        let {userName, userToExerciseDict, userId, exerciseId} = this.props;
        let exerciseDict = userToExerciseDict[userId];

        if (!exerciseDict || !exerciseDict[exerciseId]){
            return (
                <div className="alert alert-warning fade show mb-0 py-0 px-1 text-center">
                    Error occurred while trying to show details
                </div>
            )
        }
        let { attempts, exerciseName } = exerciseDict[exerciseId];
        return (
            <div
                className="container my-3"
                style={{overflow: 'auto', maxWidth: '100%' }}
            >
                {userName ? (
                    <h4>
                        Attempts of student <strong>{userName}</strong> {}
                        on exercise <strong>{exerciseName}</strong>
                    </h4>
                ) : (
                    <h4>
                        Attempts on exercise <strong>{exerciseName}</strong>
                    </h4>
                )}

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">
                                #
                            </th>
                            <th scope="col">
                                Started
                            </th>
                            <th scope="col">
                                Finished
                            </th>
                            <th scope="col">
                                Score
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(attempts) && attempts.map((a, i) => (
                            <tr key={i}>
                                <td>
                                    {i + 1}
                                </td>
                                <td>
                                    On {(new Date(a.startTime)).toLocaleDateString()} {}
                                    at {(new Date(a.startTime)).toLocaleTimeString()}
                                </td>
                                <td>
                                    On {(new Date(a.endTime)).toLocaleDateString()} {}
                                    at {(new Date(a.endTime)).toLocaleTimeString()}
                                </td>
                                <td>
                                    {(parseFloat(a.score) || a.score === 0) ?
                                        parseFloat(a.score).toFixed(2)
                                        : 'Still running'
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                {this.props.onClose && (
                    <button
                        className="btn btn-raised"
                        onClick={this.handleLeave}
                        type="button"
                    >
                        Close
                    </button>
                )}
            </div>
        );
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.grades,
    ...state.views.classroom.course.services
})
GradesStatsDetails.propTypes = {
    /**
     * The action that should be performed if this component is
     * inside a modal and this modal gets closed
     */
    onClose: PropTypes.func,
    userName: PropTypes.string,
    userId: PropTypes.string.isRequired,
    exerciseId: PropTypes.string.isRequired
}
export default connect(
    mapStateToProps
)(GradesStatsDetails)