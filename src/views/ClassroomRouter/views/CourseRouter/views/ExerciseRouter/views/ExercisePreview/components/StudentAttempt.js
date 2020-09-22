import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import { Collapse, Fade } from '@material-ui/core'
import AttemptTableRow from "./AttemptTableRow";

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
            maxScore = attempts.reduce((mx, a) => (
                (
                    parseFloat(a.score) &&
                    Math.max(parseFloat(a.score), mx)
                ) || mx),
                -1
            )
        }
        let inlineStyle = {
            alignItems: 'center',
            display: 'flex',
            flexFlow: 'row wrap'
        }
        return (
            <div
                style={{
                    borderStyle: showAttempts ? 'solid' : '',
                    borderRadius: '5px',
                    padding: '10px'
                }}
            >
                <div style={inlineStyle}>
                    <a
                        href="#void"
                        onClick={this.handleToggleClick}
                        style={{
                            ...inlineStyle,
                            color: 'black',
                            borderStyle: 'solid',
                            borderRadius: '3px',
                            padding: '5px', margin: '5px',
                        }}
                    >
                        <Icon
                            className="mr-1"
                            icon={showAttempts ? faCaretDown : faCaretRight}
                            style={{ float: 'left'}}
                        />
                        {user.name}
                    </a>
                    <Fade
                        in={showAttempts}
                        timeout={300}
                        unmountOnExit
                        appear
                    >
                        <div style={inlineStyle}>
                            <div className="m-2">
                                Total attempts: { }
                                <b>{Array.isArray(attempts) && attempts.length}</b>
                            </div>
                            <div className="m-2">
                                Best score: { }
                                <b>{(maxScore >= 0) ? maxScore.toFixed(2) : '-'}</b>
                            </div>
                        </div>
                    </Fade>
                </div>
                <Collapse
                    in={showAttempts}
                    timeout={100}
                    unmountOnExit
                    appear
                >
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Attempt</th>
                                <th scope="col">Score</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(attempts) && attempts.map((a, i) => (
                                <AttemptTableRow
                                    key={i}
                                    num={i}
                                    score={a.score}
                                    startTime={a.startTime}
                                    endTime={a.endTime}
                                />
                            ))}
                        </tbody>
                    </table>
            </Collapse>
            </div>
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