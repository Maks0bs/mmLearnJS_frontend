import React, {Component} from 'react';
import {connect} from "react-redux";
import StatsEntryRow from "../components/GradesStatsEntryRow";

/**
 * This component displays a table which assigns a student to the exercise
 * and displays the summary of this student's attempts in this exercise
 * @memberOf components.views.classroom.course.grades
 * @component
 */
class TeacherGradesStats extends Component {
    render() {
        let {summaries, course} = this.props;
        let {exercises} = course;
        return (
            <div
                className="container my-4"
                style={{
                    overflow: 'auto',
                    maxWidth: '100%'
                }}
            >
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr key={-1}>
                            <td />
                            {Array.isArray(exercises) && exercises.map((e, i) => (
                                <th
                                    key={i}
                                    scope="col"
                                    style={{
                                        wordBreak: 'keep-all',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {e.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(summaries) && summaries.map((s, i) => (
                            <StatsEntryRow
                                key={i}
                                userId={s.userId}
                                userName={s.userName}
                                userNum={i}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.grades,
    ...state.views.classroom.course.services
})
export default connect(
    mapStateToProps
)(TeacherGradesStats)