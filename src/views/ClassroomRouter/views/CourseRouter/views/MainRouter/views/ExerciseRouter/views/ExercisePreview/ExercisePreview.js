import React, {Component} from 'react';
import {connect} from "react-redux";

class ExercisePreview extends Component {
    render() {
        return (
            <div>
                <h1>
                    Exercise preview:
                </h1>
                {JSON.stringify(this.props.exercise)}
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.exercise,
        ...state.views.classroom.course.main.services
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExercisePreview)