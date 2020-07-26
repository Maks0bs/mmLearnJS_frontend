import React, {Component} from 'react';
import { editTask } from "../../../../../services/actions";
import {connect} from "react-redux";
import ChoiceOption from "../../ChoiceOption";
import { cloneDeep} from "lodash";

class MultipleChoiceOption extends Component {

    render() {
        let { taskNum, optionNum, tasks } = this.props;
        let { correctAnswers, options} = tasks[taskNum];
        let option = options[optionNum];
        return (
            <ChoiceOption
                onToggleCorrect={() => {
                    let correctPos = -1;
                    for (let i = 0; i < correctAnswers.length; i++){
                        if (option.key === correctAnswers[i]){
                            correctPos = i;
                            break;
                        }
                    }

                    let newCorrectAnswers = cloneDeep(correctAnswers);
                    if (correctPos < 0){
                        newCorrectAnswers.push(option.key);
                    } else {
                        newCorrectAnswers.splice(correctPos, 1);
                    }

                    this.props.editTask({
                        correctAnswers: newCorrectAnswers
                    }, taskNum);
                }}
                onEditSubmit={(newText) => {
                    let newOptions = options;
                    newOptions[optionNum].text = newText;
                    this.props.editTask({
                        options: newOptions
                    }, taskNum);
                }}
                onDelete={() => {
                    let newOptions = cloneDeep(options);
                    newOptions.splice(optionNum, 1);
                    let newCorrectAnswers = cloneDeep(correctAnswers);
                    let pos = newCorrectAnswers.indexOf(option.key);
                    if (pos >= 0){
                        newCorrectAnswers.splice(pos, 1);
                    }

                    this.props.editTask({
                        options: newOptions,
                        correctAnswers: newCorrectAnswers
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
)(MultipleChoiceOption);