import React, {Component} from 'react';
import {connect} from "react-redux";
import StatsDetails from "../components/GradesStatsDetails";

/**
 * This component displays summary about all exercises
 * in which the student has participated.
 * This component is meant to be displayed for students only
 * @memberOf components.views.classroom.course.grades
 * @component
 */
class StudentGradesStats extends Component {
    render() {
        let {summaries, course, userToExerciseDict} = this.props;
        let {exercises} = course, studentSummary = summaries[0];
        return (
            <div className="container my-4">
                <ul>
                    {Array.isArray(exercises) && exercises.map((e, i) => {
                        let exerciseDict = userToExerciseDict[studentSummary.userId];
                        if (!exerciseDict){
                            return (
                                <li key={i}>
                                    No data for exercise {}
                                    <strong>{e.name}</strong>
                                </li>
                            )
                        }
                        let data = exerciseDict[e._id];
                        if (data){
                            return (
                                <li key={i}>
                                    <StatsDetails
                                        userId={studentSummary.userId}
                                        exerciseId={e._id}
                                    />
                                </li>
                            )
                        } else {
                            return (
                                <li key={i}>
                                    <h3>
                                        No attempts on exercise {}
                                        <strong>{e.name}</strong>
                                    </h3>
                                </li>
                            )
                        }
                    })}
                </ul>
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
)(StudentGradesStats)