import React, {Component} from 'react';
import {connect} from "react-redux";

class StatsDetails extends Component {

    componentWillUnmount() {
        this.handleLeave();
    }


    handleLeave = () => {
        this.props.onClose && this.props.onClose();
    }

    render() {
        let summary = this.props.summaries[this.props.userNum];
        let exercise = null;
        for (let e of summary.exercises){
            if (e.id === this.props.exerciseId){
                exercise = e;
                break;
            }
        }

        if (!exercise){
            return (
                <div className="alert alert-warning fade show mb-0 py-0 px-1 text-center">
                    Error occurred while trying to show details
                </div>
            )
        }

        let { attempts } = exercise;

        return (
            <div className="container my-3">
                {this.props.onClose ? (
                    <h2>
                        Attempts of student <strong>{summary.name}</strong> on exercise <strong>{exercise.name}</strong>
                    </h2>
                ) : (
                    <h2>
                        Attempts on exercise <strong>{exercise.name}</strong>
                    </h2>
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
                        {attempts.map((a, i) => (
                            <tr
                                key={i}
                            >
                                <td>
                                    {i + 1}
                                </td>
                                <td>
                                    {(new Date(a.startTime)).toLocaleDateString()}
                                </td>
                                <td>
                                    {(new Date(a.endTime)).toLocaleDateString()}
                                </td>
                                <td>
                                    {a.score ? a.score.toFixed(2) : 'Still running'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                <button
                    className="btn btn-outline btn-raised"
                    onClick={this.handleLeave}
                    type="button"
                    style={{
                        display: this.props.onClose ? '' : 'none'
                    }}
                >
                    Cancel
                </button>
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
)(StatsDetails)