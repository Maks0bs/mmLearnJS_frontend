import React, {Component} from 'react';
import {connect} from "react-redux";

class TeacherStats extends Component {
    render() {
        let {exercises} = this.props.courseData;
        let summary = this.props.summaries[this.props.userNum]
        console.log(this.props.userToExerciseDict);
        return (
            <tr>
                <th scope="row">{summary.name}</th>
                {exercises.map((e, i) => {
                    let data = this.props.userToExerciseDict[this.props.userId][e._id]
                    return (
                        <td key={i}>
                            {data ? (
                                <span>
                                    <span
                                        style={{
                                            wordBreak: 'keep-all',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        Attempts: {data.attemptsAmount}
                                    </span>
                                    <br />
                                    <span
                                        style={{
                                            wordBreak: 'keep-all',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        Best score: {(data.maxScore === -1) ? 'Pending attempt' : data.maxScore}
                                    </span>
                                    <br />
                                    *Icon for info*
                                </span>
                            ) : (
                                '-'
                            )}
                        </td>
                    )
                })}
            </tr>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.grades,
        ...state.views.classroom.course.main.services
    }
}


export default connect(
    mapStateToProps
)(TeacherStats)