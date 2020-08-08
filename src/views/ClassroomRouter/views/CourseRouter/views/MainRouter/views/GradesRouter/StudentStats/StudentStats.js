import React, {Component} from 'react';
import {connect} from "react-redux";

class StudentStats extends Component {
    render() {

        //TODO students only have access to their own stats, teachers can also view them.
        //TODO see how it's made in moodle
        return (
            <div>
                {JSON.stringify(this.props)}
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.grades
    }
}


export default connect(
    mapStateToProps
)(StudentStats)