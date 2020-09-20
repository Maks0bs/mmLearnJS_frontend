import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {transitionStyles} from "../../../../../../../../../services/helpers";
import {Transition} from "react-transition-group";

/**
 * This component displays information about all attempts of a certain user
 * Normally displayed for teachers.
 * @memberOf components.views.classroom.course.exercise.ExercisePreview
 * @component
 */
class StudentAttempt extends Component {
    constructor(props){
        super(props);
        this.state = { showAttempts: false }
    }

    handleToggleClick = (e) => {
        e.preventDefault();
        this.setState({ showAttempts: !this.state.showAttempts})
    }

    render() {
        let { showAttempts } = this.state, maxScore = 0;
        let { user, attempts } = this.props.exercise.participants[this.props.num];
        if (Array.isArray(attempts)){
            maxScore = attempts.reduce((mx, a) =>
                (parseFloat(a.score) && Math.max(parseFloat(a.score), mx)) || mx, -1
            )
        }
        return (
            <table
                className="table table-hover my-2"
                style={{
                    borderStyle: showAttempts ? 'solid' : ''
                }}
            >
                <thead
                    onClick={this.handleToggleClick}
                    style={{
                        textOverflow: 'ellipsis',
                        background: '#dedede',
                        overflow: 'hidden',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <tr>
                        <th scope="col"
                            style={{
                                alignItems: 'center',
                                whiteSpace: 'nowrap',
                                display: 'flex'
                            }}
                        >
                            <Icon
                                className="mr-1"
                                icon={showAttempts ? faCaretDown : faCaretRight}
                                style={{ float: 'left'}}
                            />
                            {user.name}
                        </th>
                        <th scope="col">
                            Total attempts: {Array.isArray(attempts) && attempts.length}
                        </th>
                        <th scope="col">
                            Best score: {(maxScore >= 0) ? maxScore.toFixed(2) : '-'}
                        </th>
                        <th scope="col">
                            {/*empty th for time*/}
                        </th>
                    </tr>
                </thead>
                {/*TODO add normal animations here*/}
                <Transition
                    in={showAttempts}
                    timeout={100}
                    unmountOnExit
                    appear
                >
                    {state => (
                        <tbody style={{...transitionStyles.fade[state]}}>
                        {Array.isArray(attempts) && attempts.map((a, i) => (
                            <tr key={i}>
                                <td />
                                <td>
                                    {i + 1}
                                </td>
                                <td>
                                    {a.score ? a.score.toFixed(2) : '-'}
                                </td>
                                <td>
                                    {a.endTime ? (
                                        <span>
                                        <strong>Finished</strong> on { }
                                            {(new Date(a.endTime)).toLocaleDateString()} { }
                                            at {(new Date(a.endTime)).toLocaleTimeString()}
                                    </span>
                                    ) : (
                                        <strong> Still running</strong>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    )}
                </Transition>

            </table>
        );
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.exercise.services,
    ...state.views.classroom.course.services
})
export default connect(
    mapStateToProps
)(StudentAttempt);