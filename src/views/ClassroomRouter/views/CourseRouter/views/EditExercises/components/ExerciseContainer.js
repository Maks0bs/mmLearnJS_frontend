import React, { Component } from 'react';
import { connect } from 'react-redux'
import EditExercise from "./ExerciseEditor";
import {deleteExercise, restoreDeletedExercise, toggleExpandExercise} from "../services/actions";
import EditSymbol from "../../../../../../../components/reusables/EditSymbol";
import PropTypes from "prop-types";
import {transitionStyles} from "../../../../../../../services/helpers";
import {Transition} from "react-transition-group";

/**
 * This component allows the teacher to expand / minimize exercise data
 * and let the reducer know to edit certain data about exercise
 * @memberOf components.views.classroom.course.EditExercises
 * @component
 */
class ExerciseContainer extends Component {

    onToggleExercise = () => {
        let { expanded } = this.props.newExercises[this.props.num];
        this.props.toggleExpandExercise(this.props.num, !expanded);
    }

    onDelete = (e) => {
        e.preventDefault();
        this.props.deleteExercise(this.props.num);
    }

    onRestore = (e) => {
        e.preventDefault();
        this.props.restoreDeletedExercise(this.props.num);
    }

    render() {
        let { name, deleted, _id, expanded} = this.props.newExercises[this.props.num];
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
                {!expanded && (
                    <div>
                        <EditSymbol
                            onClick={this.onToggleExercise}
                            className="float-right m-1"
                            type="edit"
                        />
                        <h4>
                            {name}
                            {!_id && (<span style={{color: 'purple'}}> newly added </span>)}
                        </h4>
                    </div>
                ) }
                <Transition
                    in={expanded}
                    unmountOnExit
                    appear
                    timeout={5}
                >
                    {state => (
                        <div style={{...transitionStyles.scaleTop[state]}}>
                            <EditSymbol
                                onClick={this.onToggleExercise}
                                className="float-right m-1"
                                type="minimize"
                            />
                            <EditExercise onClose={this.props.hideModal} num={this.props.num}/>
                        </div>
                    )}
                </Transition>
            </div>
        );
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.editExercises
})
let mapDispatchToProps = (dispatch) => ({
    deleteExercise: (num) => dispatch(deleteExercise(num)),
    restoreDeletedExercise: (num) => dispatch(restoreDeletedExercise(num)),
    toggleExpandExercise: (num, val) => dispatch(toggleExpandExercise(num, val))
})
ExerciseContainer.propTypes = {
    num: PropTypes.number.isRequired
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExerciseContainer);