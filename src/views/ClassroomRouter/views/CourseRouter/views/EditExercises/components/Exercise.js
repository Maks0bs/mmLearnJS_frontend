import React, { Component } from 'react';
import { connect } from 'react-redux'
import { hideModal, showModal } from '../../../../../../../components/ModalRoot/services/actions';
import EditExercise from "./EditExercise";
import { preDeleteExercise, deleteExercise, restoreDeletedExercise} from "../services/actions";
import EditSymbol from "../../../../../../../components/reusables/EditSymbol";
import PropTypes from "prop-types";

/**
 * This component allows the teacher to view and edit one exercise
 * @memberOf components.views.classroom.course.EditExercises
 * @component
 */
class Exercise extends Component {

    showEditExerciseModal = () => {
        this.props.showModal(
            <EditExercise onClose={this.props.hideModal} num={this.props.num}/>
        )
    }

    onDelete = (e) => {
        e.preventDefault();
        this.props.deleteExercise(this.props.num);
    }

    onRestore = (e) => {
        e.preventDefault();
        this.props.restoreDeletedExercise(this.props.num);
    }

    onPreDelete = () => {
        this.props.preDeleteExercise(this.props.num);
    }

    render() {
        let { name, deleted, _id} = this.props.newExercises[this.props.num];
        if (deleted){
            return (
                <div className="pl-4">
                    <p> Deleted exercise <strong> {name} </strong> </p>
                    <a href="#void" style={{color: 'blue'}} onClick={this.onRestore}>
                        Restore
                    </a>
                    <a href="#void" className="ml-2"
                       style={{color: 'brown'}}
                       onClick={this.onDelete}
                    >
                        Do not show anymore
                    </a>
                </div>
            )
        }
        return (
            <div className="pl-4">
                <EditSymbol
                    onClick={this.showEditExerciseModal}
                    className="float-right m-1"
                    type="edit"
                />
                <EditSymbol
                    onClick={this.onPreDelete}
                    className="float-right m-1"
                    type="delete"
                />
                <h4>
                    {name}
                    {!_id && (<span style={{color: 'purple'}}> newly added </span>)}
                </h4>
            </div>
        );
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.editExercises.services
})
let mapDispatchToProps = (dispatch) => ({
    hideModal: () => dispatch(hideModal()),
    showModal: (component) => dispatch(showModal(component)),
    preDeleteExercise: (num) => dispatch(preDeleteExercise(num)),
    deleteExercise: (num) => dispatch(deleteExercise(num)),
    restoreDeletedExercise: (num) => dispatch(restoreDeletedExercise(num))
})
Exercise.propTypes = {
    num: PropTypes.number.isRequired
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Exercise);