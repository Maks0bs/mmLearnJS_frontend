import React, {Component} from 'react';
import { editTask } from "../../../../../services/actions";
import {connect} from "react-redux";
import ChoiceOption from "../../ChoiceOption";

class OneChoiceOption extends Component {

    render() {
        let { taskNum, optionNum, tasks } = this.props;
        let option = tasks[taskNum].options[optionNum];
        return (
            <ChoiceOption
                onToggleCorrect={() => {
                    this.props.editTask({
                        correctAnswer: option.key
                    }, taskNum);
                }}
                onEditSubmit={(newText) => {
                    let newOptions = tasks[taskNum].options;
                    newOptions[optionNum].text = newText;
                    this.props.editTask({
                        options: newOptions,
                        keepEditLast: false
                    }, taskNum);
                }}
                onDelete={() => {
                    let newOptions = tasks[taskNum].options;
                    newOptions.splice(optionNum, 1);
                    this.props.editTask({
                        options: newOptions
                    }, taskNum);
                }}
                option={option}
                {...this.props}
            />

        )
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.editExercises.editor
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        editTask: (task, num) => dispatch(editTask(task, num))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OneChoiceOption);