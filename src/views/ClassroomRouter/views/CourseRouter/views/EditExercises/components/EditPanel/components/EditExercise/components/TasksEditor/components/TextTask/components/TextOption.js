import React, {Component} from 'react';
import { editTask } from "../../../../../services/actions";
import {connect} from "react-redux";
import ChoiceOption from "../../ChoiceOption";
import { cloneDeep} from "lodash";

class TextOption extends Component {

    render() {
        let { taskNum, optionNum, tasks } = this.props;
        let { correctAnswers } = tasks[taskNum];
        let ans = correctAnswers[optionNum];
        return (
            <ChoiceOption
                onToggleCorrect={() => {}}
                onEditSubmit={(newText) => {
                    let newAnswers = correctAnswers;
                    newAnswers[optionNum] = newText;
                    this.props.editTask({
                        correctAnswers: newAnswers,
                        keepEditLast: false
                    }, taskNum);
                }}
                onDelete={() => {
                    let newAnswers = cloneDeep(correctAnswers);
                    newAnswers.splice(optionNum, 1);


                    this.props.editTask({
                        correctAnswers: newAnswers
                    }, taskNum);
                }}
                option={ans}
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
)(TextOption);