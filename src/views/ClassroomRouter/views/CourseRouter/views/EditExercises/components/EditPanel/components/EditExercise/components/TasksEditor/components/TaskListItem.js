import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretRight, faArrowUp, faArrowDown, faArrowCircleUp, faArrowCircleDown} from "@fortawesome/free-solid-svg-icons";
import { editTask, initTasksEditor } from "../../../services/actions";
import {connect} from "react-redux";
import {reorderArray} from "../../../../../../../../../../../../../components/services/helpers";

class TaskListItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            showChildren: false,
            backgroundColor: '#dedede',
            arrowDown: faArrowDown,
            arrowUp: faArrowUp
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
        this.setState({
            showChildren: false
        })
    }

    onMoveDown = (e) => {
        e.preventDefault();
        let { num } = this.props;
        if (num >= this.props.tasks.length - 1){
            return;
        }
        let newTasks = reorderArray(this.props.tasks, num, num + 1);
        this.props.initTasksEditor(newTasks);
        this.setState({
            showChildren: false
        })
    }

    handleToggleClick = (e) => {
        e.preventDefault();
        this.setState({
            showChildren: !this.state.showChildren
        })

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

    render() {
        let { description, score } = this.props.tasks[this.props.num];
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
                                icon={this.state.showChildren ? faCaretDown : faCaretRight}
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
                                    float: 'left'
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
                                    float: 'left'
                                }}
                                onClick={this.onMoveDown}
                                onMouseLeave={(e) => this.setState({
                                    arrowDown: faArrowDown
                                })}
                                onMouseEnter={(e) => this.setState({
                                    arrowDown: faArrowCircleDown
                                })}
                            />
                        </div>

                    </div>
                </div>

                <div
                    className="p-2"
                    style={{
                        borderStyle: 'solid',
                        display: this.state.showChildren ? '' : 'none'
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
                    Area specific for the task kind:
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
        initTasksEditor: (tasks) => dispatch(initTasksEditor(tasks))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskListItem);