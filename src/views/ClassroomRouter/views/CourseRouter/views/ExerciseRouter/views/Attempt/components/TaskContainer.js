import React, {Component} from 'react';
import PropTypes from "prop-types";

/**
 * This component is wrapper / container for specific exercise tasks
 * All tasks should be placed inside the tag with this container
 * @memberOf components.views.classroom.course.exercise.Attempt
 * @component
 */
class TaskContainer extends Component {
    render() {
        let { achievedScore, changed, maxScore: score, description } = this.props;
        return (
            <div className="container my-2">
                <div className="row">
                    <div className="col md-auto">
                        <p
                            className="p-2"
                            style={{
                                borderStyle: 'dotted',
                                display: 'inline-block',
                                borderRadius: '5px',
                            }}
                        >
                            <i>Score:</i>
                            {(achievedScore !== 0 && !achievedScore) ? (
                                <strong className="mx-1">{score} points</strong>
                            ) : (
                                <div>
                                    <strong className="mx-1">{achievedScore}</strong> {}
                                    / {score} points
                                </div>
                            )}
                        </p>
                    </div>
                    <div
                        className="col md-auto p-2"
                        style={{
                            minWidth: '85%',
                            borderStyle: 'solid'
                        }}
                    >
                        <h5>
                            {description}
                            {changed && (
                                <strong style={{color: 'red'}}>*</strong>
                            )}
                        </h5>

                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
TaskContainer.propTypes = {
    /**
     * The score that was achieved by the student who took the attempt
     * for the given task
     */
    achievedScore: PropTypes.number,
    /**
     * True if attempt is active and the answer to the given task
     * has been changed during this attempt
     */
    changed: PropTypes.bool,
    /** True if users shouldn't be able to interact with given task */
    disabled: PropTypes.bool,
    /** Max achievable score for the task */
    maxScore: PropTypes.number,
    description: PropTypes.string
}
export default TaskContainer;