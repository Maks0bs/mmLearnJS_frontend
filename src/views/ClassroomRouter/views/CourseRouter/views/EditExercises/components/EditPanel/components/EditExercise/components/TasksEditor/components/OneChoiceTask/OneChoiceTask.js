import React, {Component} from 'react';
import TaskListItem from "../TaskListItem";
import {addOneChoiceTask} from "../../../../services/actions";
import {connect} from "react-redux";

class OneChoiceTask extends Component {

    // requires num in props to work

    render() {
        let { tasks, num } = this.props;
        let task = tasks[num];
        return (
            <div>
                <TaskListItem num={num}>
                    {JSON.stringify(task)}
                </TaskListItem>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.editExercises.editor
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addOneChoiceTask: () => dispatch(addOneChoiceTask())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OneChoiceTask);