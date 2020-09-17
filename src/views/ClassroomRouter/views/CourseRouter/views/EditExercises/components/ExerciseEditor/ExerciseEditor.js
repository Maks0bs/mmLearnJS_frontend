import React, { Component } from 'react';
import { connect } from 'react-redux'
import { preDeleteExercise, editExercise, addNewTask } from "../../services/actions";
import PropTypes from "prop-types";
import OneChoiceTask from "./components/OneChoiceTask";
import MultipleChoiceTask from "./components/MultipleChoiceTask";
import TextTask from "./components/TextTask";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faDiceOne, faFeather, faTasks} from "@fortawesome/free-solid-svg-icons";
import EditSymbol from "../../../../../../../../components/reusables/EditSymbol";

/**
 * This component allows the teacher to view and edit one exercise
 * and view data about tasks in the given exercise
 * @memberOf components.views.classroom.course.EditExercises.ExerciseContainer
 * @component
 */
class ExerciseEditor extends Component {

    onPreDelete = () => {
        this.props.preDeleteExercise(this.props.num);
    }

    onNewTask = (type) => (e) => {
        e.preventDefault();
        this.props.addNewTask(type, this.props.num);
    }

    handleChange = (name) => (event) => {
        let { num } = this.props, newData, exercise = this.props.newExercises[num];
        if (name === 'available'){
            newData = {available: !exercise.available};
        } else {
            newData = { [name]: event.target.value };
        }
        this.props.editExercise(newData, num);
    }

    render() {
        let { num } = this.props;
        let { name, available, weight, tasks } = this.props.newExercises[num];
        let inlineStyle = {display: 'flex', alignItems: 'center'}
        return (
            <div>
                <div className="form-group" style={inlineStyle}>
                    <input
                        onChange={this.handleChange("name")}
                        type="text"
                        className="form-control"
                        value={name}
                    />
                </div>
                <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                    <div className="form-group mx-3" style={inlineStyle}>
                        <label
                            className="text-muted my-0 mx-2"
                            htmlFor={`exercise${num} studentAvailability`}
                        >
                            Available to students
                        </label>
                        <input
                            id={`exercise${num} studentAvailability`}
                            type="checkbox"
                            onChange={this.handleChange("available")}
                            checked={available}
                            value={available}
                        />
                    </div>

                    <div className="form-group mx-3" style={inlineStyle}>
                        <label className="text-muted my-0 mx-2">Weight in overall score:</label>
                        <input
                            type="number"
                            onChange={this.handleChange("weight")}
                            value={weight}
                            min={1}
                            max={1000}
                        />
                    </div>
                </div>

                <div className="my-3">
                    <div>
                        {tasks && tasks.map((task, i) => {
                            switch(task.kind){
                                case 'OneChoiceTask':
                                    return (
                                        <OneChoiceTask className="my-2"
                                            exerciseNum={num} taskNum={i} key={i}
                                        />
                                    )
                                case 'MultipleChoiceTask':
                                    return (
                                        <MultipleChoiceTask className="my-2"
                                            exerciseNum={num} taskNum={i} key={i}
                                        />
                                    )
                                case 'TextTask':
                                    return (
                                        <TextTask className="my-2"
                                            exerciseNum={num} taskNum={i} key={i}
                                        />
                                    )
                                default:
                                    return (<div key={i}>unknown task</div>)
                            }
                        })}
                    </div>
                </div>
                <div className="mt-2">
                    <a className="my-2" href="#void"
                       onClick={this.onNewTask('OneChoice')}
                    >
                        <Icon icon={faDiceOne} className="pr-1"/>
                        Add one choice task
                    </a>
                    <br/>
                    <a className="my-2" href="#void"
                       onClick={this.onNewTask('MultipleChoice')}
                    >
                        <Icon icon={ faTasks } className="pr-1"/>
                        Add multiple choice task
                    </a>
                    <br/>
                    <a className="my-2" href="#void"
                       onClick={this.onNewTask('Text')}
                    >
                        <Icon icon={ faFeather } className="pr-1"/>
                        Add text task
                    </a>
                    <EditSymbol
                        onClick={this.onPreDelete}
                        className="float-right m-1"
                        type="delete"
                    />
                </div>
            </div>
        );
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.editExercises
})
let mapDispatchToProps = (dispatch) => ({
    preDeleteExercise: (num) => dispatch(preDeleteExercise(num)),
    editExercise: (exercise, num) => dispatch(editExercise(exercise, num)),
    addNewTask: (type, exerciseNum) => dispatch(addNewTask(type, exerciseNum))
})
ExerciseEditor.propTypes = {
    num: PropTypes.number.isRequired
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExerciseEditor);