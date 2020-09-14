import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {
    faCaretDown,
    faCaretRight,
    faArrowUp,
    faArrowDown,
    faArrowCircleUp,
    faArrowCircleDown,
    faTrashAlt,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import { editTask, initTasksEditor, toggleTaskExpand } from "../../../services/actions";
import {connect} from "react-redux";
import {reorderArray} from "../../../../../../../../../../../components/services/helpers";
import { cloneDeep } from 'lodash'

class TaskListItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            showChildren: false,
            backgroundColor: '#dedede',
            arrowDown: faArrowDown,
            arrowUp: faArrowUp,
            trashIcon: faTrash
        }
    }

    onMoveUp = (e) => {
        e.preventDefault();
        let { num } = this.props;
        if (num <= 0){
            return;
        }
        let newTasks = reorderArray(this.props.tasks, num, num - 1);
        this.props.initTasksEditor(newTasks);

        let prevExpand = this.props.expandedTasks[num];
        this.props.toggleTaskExpand(num, this.props.expandedTasks[num - 1]);
        this.props.toggleTaskExpand(num - 1, prevExpand);

    }

    onMoveDown = (e) => {
        e.preventDefault();
        let { num } = this.props;
        if (num >= this.props.tasks.length - 1){
            return;
        }
        let newTasks = reorderArray(this.props.tasks, num, num + 1);
        this.props.initTasksEditor(newTasks);

        let prevExpand = this.props.expandedTasks[num];
        this.props.toggleTaskExpand(num, this.props.expandedTasks[num + 1]);
        this.props.toggleTaskExpand(num + 1, prevExpand);
    }

    handleToggleClick = (e) => {
        e.preventDefault();
        let { num } = this.props;
        this.props.toggleTaskExpand(this.props.num, !this.props.expandedTasks[num])
    }

    handleMouseEnter = (e) => {
        e.preventDefault();
        this.setState({
            backgroundColor: '#919191'
        })
    }

    handleMouseLeave = (e) => {
        e.preventDefault();
        this.setState({
            backgroundColor: '#dedede'
        })
    }

    handleChange = (name) => (event) => {
        // this.setState({
        //     [name]: event.target.value
        // })


        this.props.editTask({
            [name]: event.target.value
        }, this.props.num)
    }

    onDelete = (e) => {
        e.preventDefault();
        let { num, tasks, expandedTasks } = this.props;
        let newTasks = cloneDeep(tasks);
        newTasks.splice(num, 1);

        // Re-expand all tasks that have a greater index than this one
        for (let i = num + 1; i < tasks.length; i++){
            if (expandedTasks[i]){
                this.props.toggleTaskExpand(i, false);
                this.props.toggleTaskExpand(i - 1, true);
            }
        }
        this.props.initTasksEditor(newTasks);
    }

    render() {
        let { description, score } = this.props.tasks[this.props.num];
        let expanded = this.props.expandedTasks[this.props.num];
        return (
            <div>
                <div>
                    <div

                        style={{
                            display: 'flex',
                            whiteSpace: 'nowrap',
                            alignItems: 'center',
                            color: 'darkblue'

                        }}
                    >

                        <div
                            onClick={this.handleToggleClick}
                            style={{
                                textOverflow: 'ellipsis',
                                background: this.state.backgroundColor,
                                display: 'flex',
                                overflow: 'hidden',
                                alignItems: 'center',
                                whiteSpace: 'nowrap',
                                width: '50%',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}
                        >
                            <Icon
                                icon={expanded ? faCaretDown : faCaretRight}
                                style={{
                                    float: 'left'
                                }}
                            />
                            {description}
                        </div>

                        <div>
                            <Icon
                                className="mx-1"
                                icon={this.state.arrowUp}

                                style={{
                                    float: 'left',
                                    cursor: 'pointer'
                                }}
                                onClick={this.onMoveUp}
                                onMouseLeave={(e) => this.setState({
                                    arrowUp: faArrowUp
                                })}
                                onMouseEnter={(e) => this.setState({
                                    arrowUp: faArrowCircleUp
                                })}
                            />
                            <Icon
                                className="mx-1"
                                icon={this.state.arrowDown}
                                style={{
                                    float: 'left',
                                    cursor: 'pointer'
                                }}
                                onClick={this.onMoveDown}
                                onMouseLeave={(e) => this.setState({
                                    arrowDown: faArrowDown
                                })}
                                onMouseEnter={(e) => this.setState({
                                    arrowDown: faArrowCircleDown
                                })}
                            />

                            <Icon
                                className="mx-3"
                                icon={this.state.trashIcon}
                                style={{
                                    float: 'right',
                                    cursor: 'pointer',
                                    color: 'red'
                                }}
                                onClick={this.onDelete}
                                onMouseLeave={(e) => this.setState({
                                    trashIcon: faTrash
                                })}
                                onMouseEnter={(e) => this.setState({
                                    trashIcon: faTrashAlt
                                })}
                            />
                        </div>

                    </div>
                </div>

                <div
                    className="p-2"
                    style={{
                        borderStyle: 'solid',
                        display: expanded ? '' : 'none'
                    }}
                >
                    <div className="form-group">
                        <textarea
                            value={description}
                            onChange={this.handleChange("description")}
                            style={{
                                maxWidth: '100%',
                                width: '100%'
                            }}
                        />
                    </div>

                    <div>
                        <label className="text-muted mr-1">Score</label>
                        <input
                            type="number"
                            min={1}
                            max={100}
                            value={score}
                            onChange={this.handleChange("score")}
                        />
                    </div>
                    {this.props.children}
                </div>


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
        editTask: (task, num) => dispatch(editTask(task, num)),
        initTasksEditor: (tasks) => dispatch(initTasksEditor(tasks)),
        toggleTaskExpand: (num, expand) => dispatch(toggleTaskExpand(num, expand))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskListItem);