import React, { Component } from 'react';
import { connect } from 'react-redux'
import { preDeleteExercise, editExercise } from "../../../../services/actions";

class EditExercise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            weight: 1,
            available: true
        }
    }


    //this.props.num is required to work!!!!!!!

    onPreDelete = (e) => {
        e.preventDefault();
        this.props.preDeleteExercise(this.props.num);
    }

    componentDidMount() {
        let { num } = this.props;
        let exercise = this.props.courseData.exercises[num];
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

    handleLeave = () => {
        this.props.onClose && this.props.onClose();
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.props.editExercise( {
            ...this.state
        }, this.props.num)
        this.handleLeave();
    }

    render() {
        let exercise = this.props.courseData.exercises[this.props.num];
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
                            checked={weight}
                            min={1}
                            max={1000}
                        />
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
        ...state.views.classroom.course.editExercises
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        preDeleteExercise: (num) => dispatch(preDeleteExercise(num)),
        editExercise: (exercise, num) => dispatch(editExercise(exercise, num))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditExercise);