import React, { Component } from 'react';
import { connect } from 'react-redux'
import { preDeleteExercise, editExercise  } from "../../services/actions";
import { initTasksEditor, cleanup } from "./services/actions";
import TasksEditor from "./components/TasksEditor/TasksEditor";

class EditExercise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            weight: '1',
            available: true
        }
    }


    //this.props.num is required to work!!!!!!!

    onPreDelete = (e) => {
        e.preventDefault();
        this.props.preDeleteExercise(this.props.num);
        this.handleLeave();
    }

    componentDidMount() {
        let { num } = this.props;
        let exercise = this.props.courseData.exercises[num];
        this.props.initTasksEditor(exercise.tasks);
        this.setState({
            name: exercise.name,
            available: exercise.available,
            weight: exercise.weight
        })
    }

    handleChange = (name) => (event) => {
        if (name === 'available'){
            return this.setState({
                available: !this.state.available
            })
        }
        this.setState({
            [name]: event.target.value
        })
    }

    componentWillUnmount() {
        this.handleLeave();
    }


    handleLeave = () => {
        this.props.cleanup();
        this.props.onClose && this.props.onClose();
    }

    onSubmit = (e) => {
        e.preventDefault();


        this.props.editExercise( {
            ...this.state,
            tasks: this.props.tasks
        }, this.props.num)
        this.handleLeave();
    }

    render() {
        let { name, available, weight } = this.state;
        return (
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input
                            onChange={this.handleChange("name")}
                            type="text"
                            className="form-control"
                            value={name}
                        />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Available to students</label>
                        <input
                            type="checkbox"
                            onChange={this.handleChange("available")}
                            className="ml-3"
                            checked={available}
                        />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Weight in overall score</label>
                        <input
                            type="number"
                            onChange={this.handleChange("weight")}
                            className="ml-3"
                            value={weight}
                            min={1}
                            max={1000}
                        />
                    </div>

                    <div className="my-3">
                        <TasksEditor />
                    </div>

                    <button
                        className="btn btn-outline btn-raised"
                        onClick={this.handleLeave}
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-outline btn-raised btn-danger ml-3"
                        onClick={this.onPreDelete}
                        type="button"
                    >
                        Delete
                    </button>
                    <button
                        className="btn btn-outline btn-raised btn-success ml-3"
                        type="submit"
                    >
                        Save
                    </button>
                </form>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.editExercises.services,
        ...state.views.classroom.course.editExercises.editor
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        preDeleteExercise: (num) => dispatch(preDeleteExercise(num)),
        editExercise: (exercise, num) => dispatch(editExercise(exercise, num)),
        initTasksEditor: (tasks) => dispatch(initTasksEditor(tasks)),
        cleanup: () => dispatch(cleanup())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditExercise);