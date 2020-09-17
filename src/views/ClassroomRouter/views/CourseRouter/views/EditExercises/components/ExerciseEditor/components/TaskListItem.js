import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import { editExercise, editTask, toggleExpandTask, deleteTask } from "../../../services/actions";
import {connect} from "react-redux";
import {reorderArrayShallow} from "../../../../../../../../../services/helpers";
import EditSymbol from "../../../../../../../../../components/reusables/EditSymbol";
import PropTypes from 'prop-types'

/**
 * This is a general component for any task which displays complete task data
 * @memberOf components.views.classroom.course.EditExercises.ExerciseContainer.ExerciseEditor
 * @component
 */
class TaskListItem extends Component {
    constructor(props){
        super(props);
        this.state = { backgroundColor: '#e0e0e0'}
    }

    onMove = (type) => () => {
        let {exerciseNum, taskNum: num, newExercises} = this.props;
        let {tasks} = newExercises[exerciseNum];
        let newNum = -100;
        if (type === 'up' && num > 0) {
            newNum = num - 1;
        }
        if (type === 'down' && num < tasks.length - 1) {
            newNum = num + 1;
        }
        if (newNum < 0) return;

        let newTasks = reorderArrayShallow(tasks, num, newNum);
        this.props.editExercise({tasks: newTasks}, exerciseNum);
    }

    handleToggleClick = (value) => (e) => {
        e.preventDefault();
        this.props.toggleExpandTask(this.props.exerciseNum, this.props.taskNum, value);
    }

    handleChange = (name) => (event) => {
        this.props.editTask(
            { [name]: event.target.value },
            this.props.exerciseNum, this.props.taskNum
        )
    }

    render() {
        let { exerciseNum, taskNum, newExercises, className, style, taskName     } = this.props;
        let { description, score, expanded } = newExercises[exerciseNum].tasks[taskNum];
        let inlineStyle = {display: 'flex', whiteSpace: 'nowrap', alignItems: 'center'}
        let isMobileWidth = (window.innerWidth <= 1000);
        return (
            <div className={className || ''} style={style && {...style}}>
                <div className="column"
                    style={{
                        display: 'inline-block',
                        maxWidth: '80%',
                        padding: '5px',
                        borderRadius: '5px',
                        background: '#e0e0e0',
                        gridAutoRows: '1fr'
                    }}
                >
                    <div
                        onMouseEnter={() => this.setState({ backgroundColor: '#919191' })}
                        onMouseLeave={() => this.setState({ backgroundColor: '#e0e0e0' })}
                        style={{
                            ...inlineStyle,
                            background: this.state.backgroundColor,
                            padding: '5px',
                            borderRadius: '5px'
                        }}
                    >
                        <div
                            onClick={this.handleToggleClick(!expanded)}
                            style={{
                                ...inlineStyle,
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer'
                            }}
                        >
                            <Icon
                                icon={expanded ? faCaretDown : faCaretRight}
                                style={{float: 'left'}}
                            />
                            {description}
                        </div>
                        <div style={{display: 'flex'}}>
                            <EditSymbol
                                className="ml-1 float-right"
                                type="move-down"
                                onClick={this.onMove('down')}
                            />
                            <EditSymbol
                                className="ml-1 mr-2 float-right"
                                type="move-up"
                                onClick={this.onMove('up')}
                            />
                            <EditSymbol
                                className=" float-right"
                                type="delete"
                                onClick={() => this.props.deleteTask(exerciseNum, taskNum)}
                            />
                        </div>
                    </div>
                    <div
                        className="p-2"
                        style={{display: expanded ? '' : 'none'}}
                    >
                        <div className="form-group">
                                <textarea
                                    value={description}
                                    onChange={this.handleChange("description")}
                                    style={{ maxWidth: '100%',  width: '100%' }}
                                />
                        </div>
                        <div
                            className="form-group"
                            style={{...inlineStyle, flexFlow: 'row wrap'}}
                        >
                            <p><i>{taskName}</i></p>
                            <div className="form-group mx-3" style={inlineStyle} >
                                <label className="text-muted mx-2 my-0">Score</label>
                                <input
                                    type="number"
                                    min={1} max={100}
                                    value={score}
                                    onChange={this.handleChange("score")}
                                />
                            </div>
                        </div>

                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.editExercises
})
let mapDispatchToProps = (dispatch) => ({
    editExercise: (data, num) => dispatch(editExercise(data, num)),
    editTask: (task, exerciseNum, taskNum) => dispatch(editTask(task, exerciseNum, taskNum)),
    deleteTask: (exerciseNum, taskNum) => dispatch(deleteTask(exerciseNum, taskNum)),
    toggleExpandTask: (exerciseNum, taskNum, val) =>
        dispatch(toggleExpandTask(exerciseNum, taskNum, val))
})
TaskListItem.propTypes = {
    exerciseNum: PropTypes.number.isRequired,
    taskNum: PropTypes.number.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    taskName: PropTypes.string
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskListItem);