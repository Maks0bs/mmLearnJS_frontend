import React, {Component} from 'react';
import {connect} from "react-redux";

class OneChoiceTask extends Component {
    render() {
        let { description, score } = this.props.exercise.tasks[this.props.num]
        return (
            <div className="container my-2">
                <div className="row">
                    <div className="col md-auto"
                    >
                        <p className="p-2"
                            style={{
                                borderStyle: 'dotted',
                                display: 'inline-block'
                            }}
                        >
                            <i>Score:</i>
                            <strong className="mx-1">{score}</strong>
                        </p>
                    </div>

                    <div className="col md-auto p-2"
                         style={{
                             minWidth: '85%',
                             borderStyle: 'solid'
                         }}
                    >
                        <h5>
                            {description}
                            <strong
                                style={{
                                    display: this.props.changed ? '' : 'none',
                                    color: 'red'
                                }}
                            >
                               *
                            </strong>
                        </h5>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.exercise.services,
        ...state.views.classroom.course.main.exercise.attempt
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OneChoiceTask)