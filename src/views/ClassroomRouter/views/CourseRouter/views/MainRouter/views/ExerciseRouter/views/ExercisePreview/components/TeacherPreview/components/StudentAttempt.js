import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {
    faCaretDown,
    faCaretRight,
    faArrowUp,
    faArrowDown,
    faArrowCircleUp,
    faArrowCircleDown,
    faTrashAlt,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";

class StudentAttempt extends Component {
    constructor(props){
        super(props);

        this.state = {
            showAttempts: false,
            backgroundColor: '#dedede'
        }
    }

    handleToggleClick = (e) => {
        e.preventDefault();
        this.setState({
            showAttempts: !this.state.showAttempts
        })
    }

    handleMouseEnter = (e) => {
        e.preventDefault();
        this.setState({
            backgroundColor: '#919191'
        })
    }

    handleMouseLeave = (e) => {
        e.preventDefault();
        this.setState({
            backgroundColor: '#dedede'
        })
    }

    render() {
        let { showAttempts, backgroundColor } = this.state;
        let { user, attempts } = this.props.exercise.participants[this.props.num];
        let maxScore = -1;
        for (let a of attempts){
            if (a.score && a.score > maxScore){
                maxScore = a.score;
            }
        }
        return (
            <div>
                <table
                    className="table"
                >
                    <thead
                        onClick={this.handleToggleClick}
                        style={{
                            textOverflow: 'ellipsis',
                            background: this.state.backgroundColor,
                            overflow: 'hidden',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
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
                                    className="mr-2"
                                    icon={showAttempts ? faCaretDown : faCaretRight}
                                    style={{
                                        float: 'left'
                                    }}
                                />
                                {user.name}
                            </th>
                            <th scope="col">
                                Total attempts: {attempts.length}
                            </th>
                            <th scope="col">
                                Best score: {(maxScore >= 0) ? maxScore.toFixed(2) : '-'}
                            </th>
                            <th scope="col">
                                {/*empty th for time*/}
                            </th>
                        </tr>
                    </thead>

                    <tbody
                        style={{
                            borderStyle: 'solid',
                            display: showAttempts ? '' : 'none'
                        }}
                    >
                        {attempts.map((a, i) => (
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
                                            <strong>Finished</strong> on {(new Date(a.endTime)).toLocaleDateString()}
                                            { } at {(new Date(a.endTime)).toLocaleTimeString()}
                                        </span>
                                    ) : (
                                        <strong>
                                            Still running
                                        </strong>
                                    )}

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>



            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.exercise.services,
        ...state.views.classroom.course.main.services,
        ...state.services
    }
}

let mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentAttempt);