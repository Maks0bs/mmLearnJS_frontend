import React, {Component} from 'react';
import {getExerciseSummaries} from "../services/actions";
import {connect} from "react-redux";
import StatsEntry from "../components/StatsEntry/StatsEntry";
import EntryCell from "../components/StatsEntry/components/EntryCell";
import StatsDetails from "../components/StatsDetails";

class StudentStats extends Component {
    render() {
        let {summaries} = this.props;
        let {exercises} = this.props.courseData;
        return (
            <div className="container my-4">
                <ul>
                    {exercises && exercises.map((e, i) => {
                        let data = this.props.userToExerciseDict[summaries[0].id][e._id]
                        if (data){
                            return (
                                <li key={i}>
                                    <StatsDetails
                                        userNum={0}
                                        exerciseId={e._id}
                                    />
                                </li>
                            )
                        } else {
                            return (
                                <li key={i}>
                                    <h3>No attempts on exercise <strong>{e.name}</strong></h3>
                                </li>
                            )
                        }
                    })}
                </ul>

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
)(StudentStats)