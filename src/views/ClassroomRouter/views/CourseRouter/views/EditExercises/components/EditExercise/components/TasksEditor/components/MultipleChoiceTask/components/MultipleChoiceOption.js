import React, {Component} from 'react';
import { editTask } from "../../../../../services/actions";
import {connect} from "react-redux";
import ChoiceOption from "../../ChoiceOption";
import {removeItemShallow} from "../../../../../../../../../../../../../services/helpers";

class MultipleChoiceOption extends Component {

    render() {
        let { taskNum, optionNum, tasks } = this.props;
        let { correctAnswers, options} = tasks[taskNum];
        let option = options[optionNum];
        return (
            <ChoiceOption
                onToggleCorrect={() => {
                    let correctPos = correctAnswers.indexOf(option.key), newCorrectAnswers;
                    if (correctPos < 0){
                        // add a correct option
                        newCorrectAnswers = [...correctAnswers, option.key]
                    } else {
                        // remove a correct option
                        newCorrectAnswers = removeItemShallow(correctAnswers, correctPos);
                    }
                    this.props.editTask(
                        {correctAnswers: newCorrectAnswers},
                        taskNum
                    );
                }}
                onEditSubmit={(newText) => {
                    let newOptions = [...options];
                    newOptions[optionNum].text = newText;
                    this.props.editTask(
                        { options: newOptions, keepEditLast: false},
                        taskNum
                    );
                }}
                onDelete={() => {
                    this.props.editTask({
                        options: removeItemShallow(options, optionNum),
                        correctAnswers: correctAnswers.filter(a => a !== option.key)
                    }, taskNum);
                }}
                option={option}
                {...this.props}
            />

        )
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.editExercises.editor
})
let mapDispatchToProps = (dispatch) => ({
    editTask: (task, num) => dispatch(editTask(task, num))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MultipleChoiceOption);