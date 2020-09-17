import React, { Component } from 'react';
import { connect } from 'react-redux'
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { addNewTask } from "../../services/actions";
import { faDiceOne, faTasks, faFeather } from "@fortawesome/free-solid-svg-icons";
import OneChoiceTask from "./components/OneChoiceTask";
import MultipleChoiceTask from "./components/MultipleChoiceTask/MultipleChoiceTask";
import TextTask from "./components/TextTask/TextTask";

class TasksEditor extends Component {

    onNewTask = (type) => (e) => {
        e.preventDefault();
        this.props.addNewTask(type);
    }

    render() {
        let { tasks } = this.props;
        return (
            <div className="my-3">
                <div>
                    {tasks &&   tasks.map((task, i) => {
                        switch(task.kind){
                            case 'OneChoiceTask':
                                return (<OneChoiceTask num={i} key={i}/>)
                            case 'MultipleChoiceTask':
                                return (<MultipleChoiceTask num={i} key={i}/>)
                            case 'TextTask':
                                return (<TextTask num={i} key={i}/>)
                            default:
                                return (<div key={i}>unknown task</div>)
                        }
                    })}
                </div>
                <div className="mt-2">
                    <a href="#void" onClick={this.onNewTask('OneChoice')}>
                        <Icon icon={faDiceOne} className="pr-1"/>
                        Add one choice task
                    </a>
                    <br/>
                    <a href="#void" onClick={this.onNewTask('MultipleChoice')}>
                        <Icon icon={ faTasks } className="pr-1"/>
                        Add multiple choice task
                    </a>
                    <br/>
                    <a href="#void" onClick={this.onNewTask('Text')}>
                        <Icon icon={ faFeather } className="pr-1"/>
                        Add text task
                    </a>
                </div>
            </div>
        )
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.editExercises.services,
    ...state.views.classroom.course.editExercises.editor
})
let mapDispatchToProps = (dispatch) => ({
    addNewTask: (type) => dispatch(addNewTask(type))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TasksEditor);