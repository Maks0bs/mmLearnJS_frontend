import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import { editTask, initTasksEditor, toggleTaskExpand } from "../../../services/actions";
import {connect} from "react-redux";
import {reorderArrayShallow} from "../../../../../../../../../../../services/helpers";
import EditSymbol from "../../../../../../../../../../../components/reusables/EditSymbol";
import PropTypes from 'prop-types'

class TaskListItem extends Component {
    constructor(props){
        super(props);
        this.state = { backgroundColor: '#dedede'}
    }

    onMove = (type) => (e) => {
        e.preventDefault();
        let { num, tasks } = this.props;
        let newNum = -100;
        if (type === 'up' && num > 0){
            newNum = num - 1;
        }
        if (type === 'down' && num < tasks.length){
            newNum = num + 1;
        }
        if (newNum < 0) return;

        let newTasks = reorderArrayShallow(tasks, num, newNum);
        this.props.initTasksEditor(newTasks);

        let prevExpand = this.props.expandedTasks[num];
        this.props.toggleTaskExpand(num, this.props.expandedTasks[newNum]);
        this.props.toggleTaskExpand(newNum, prevExpand);
    }

    handleToggleClick = (e) => {
        e.preventDefault();
        this.props.toggleTaskExpand(this.props.num, !this.props.expandedTasks[this.props.num])
    }

    handleChange = (name) => (event) => {
        this.props.editTask(
            { [name]: event.target.value },
            this.props.num
        )
    }

    onDelete = (e) => {
        e.preventDefault();
        let { num, tasks, expandedTasks } = this.props;
        let newTasks = [...tasks];
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
        let inlineStyle = {display: 'flex', whiteSpace: 'nowrap', alignItems: 'center'}
        return (
            <div className="my-2">
                <div>
                    <div style={{ ...inlineStyle, color: 'darkblue'}}>
                        <div
                            onClick={this.handleToggleClick}
                            style={{
                                ...inlineStyle,
                                textOverflow: 'ellipsis',
                                background: this.state.backgroundColor,
                                overflow: 'hidden',
                                width: '50%',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={() =>
                                this.setState({ backgroundColor: '#919191' })
                            }
                            onMouseLeave={() =>
                                this.setState({ backgroundColor: '#dedede' })
                            }
                        >
                            <Icon
                                icon={expanded ? faCaretDown : faCaretRight}
                                style={{float: 'left'}}
                            />
                            {description}
                        </div>
                        <div>
                            <EditSymbol
                                className="mx-1 float-left"
                                type="move-up"
                                onClick={this.onMove('up')}
                            />
                            <EditSymbol
                                className="mx-1 float-left"
                                type="move-down"
                                onClick={this.onMove('down')}
                            />
                            <EditSymbol
                                className="mx-3 float-right"
                                type="delete"
                                onClick={this.onDelete}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="p-2"
                    style={{ borderStyle: 'solid', display: expanded ? '' : 'none'}}
                >
                    <div className="form-group">
                        <textarea
                            value={description}
                            onChange={this.handleChange("description")}
                            style={{ maxWidth: '100%',  width: '100%' }}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted mr-1">Score</label>
                        <input
                            type="number"
                            min={1} max={100}
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
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.editExercises.editor
})
let mapDispatchToProps = (dispatch) => ({
    editTask: (task, num) => dispatch(editTask(task, num)),
    initTasksEditor: (tasks) => dispatch(initTasksEditor(tasks)),
    toggleTaskExpand: (num, expand) => dispatch(toggleTaskExpand(num, expand))
})
TaskListItem.propTypes = {
    num: PropTypes.number.isRequired
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskListItem);