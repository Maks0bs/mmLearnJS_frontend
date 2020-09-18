import React, {Component} from 'react';
import {getExerciseSummaries} from "../services/actions";
import {connect} from "react-redux";
import StatsEntry from "../components/StatsEntry/StatsEntry";

class TeacherStats extends Component {
    render() {
        let {summaries} = this.props;
        let {exercises} = this.props.courseData;
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
                            {exercises && exercises.map((e, i) => (
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
                        {summaries.map((s, i) => (
                            <StatsEntry
                                key={i}
                                userId={s.id}
                                userNum={i}
                            />

                        ))}
                    </tbody>
                </table>
            </div>
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