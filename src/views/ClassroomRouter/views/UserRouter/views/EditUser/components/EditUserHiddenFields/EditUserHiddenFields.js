import React, {Component} from 'react';
import { connect } from 'react-redux'
import { setHiddenFields } from "../../../../services/actions";
import { EDIT_FIELDS_DND_TYPE, USER_FIELDS } from "../../../../services/helpers";
import { reorderArray } from "../../../../../../../../components/services/helpers";
import PropTypes from "prop-types";
import AvailableFieldsDroppable from "./components/AvailableFieldsDroppable";
import HiddenFieldsDroppable from "./components/HiddenFieldsDroppable";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
/**
 * Lets the user adjust what data they want to be publicly displayed
 * on their profile page
 * @memberOf components.views.classroom.user.EditUser
 * @component
 */
class EditUserHiddenFields extends Component {
    constructor(props) {
        super(props);
        this.state = {hiddenFields: [], availableFields: []}
    }

    componentDidMount() {
        let availableFields = [];
        for (let f of USER_FIELDS){
            if (!(f === 'teacherCourses' && this.props.user.role === 'student') &&
                !this.props.newHiddenFields.includes(f)
            ){
                availableFields.push(f);
            }
        }
        this.setState({
            hiddenFields: this.props.newHiddenFields,
            availableFields: availableFields
        })
    }

    handleLeave = () => this.props.onClose && this.props.onClose();

    componentWillUnmount(){this.handleLeave();}

    onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        let newHiddenFields = [...this.state.hiddenFields],
            newAvailableFields = [...this.state.availableFields]

        if (result.type === EDIT_FIELDS_DND_TYPE) {
            if (result.source.droppableId === result.destination.droppableId){
                if (result.source.droppableId === 'droppableAvailableFields'){
                    newAvailableFields = reorderArray(
                        this.state.availableFields,
                        result.source.index,
                        result.destination.index
                    )
                } else if (result.source.droppableId === 'droppableHiddenFields'){
                    newHiddenFields = reorderArray(
                        this.state.hiddenFields,
                        result.source.index,
                        result.destination.index
                    )
                }
            } else {
                // Remove field from one list and put it to another
                let indexSource = result.source.index;
                let indexDest = result.destination.index;
                if (result.source.droppableId === 'droppableAvailableFields'){
                    let element = this.state.availableFields[indexSource];
                    newAvailableFields.splice(indexSource, 1);
                    newHiddenFields.splice(indexDest, 0, element)
                } else if (result.source.droppableId === 'droppableHiddenFields'){
                    let element = this.state.hiddenFields[indexSource];
                    newHiddenFields.splice(indexSource, 1);
                    newAvailableFields.splice(indexDest, 0, element)
                }
            }
            this.setState({
                hiddenFields: newHiddenFields,
                availableFields: newAvailableFields
            })
        }
    }

    onSave = (e) => {
        e.preventDefault();
        this.props.setHiddenFields(this.state.hiddenFields);
        this.handleLeave();
    }

    render() {

        let { hiddenFields, availableFields } = this.state;
        let isMobileWidth = (window.innerWidth <= 1000);
        return (
            <div
                className="container my-3"
                style={{width: isMobileWidth ? '80%' : '50%'}}
            >
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppableAvailableFields" type={EDIT_FIELDS_DND_TYPE}>
                        {(provided, snapshot) => (
                            <AvailableFieldsDroppable
                                availableFields={availableFields}
                                provided={provided} snapshot={snapshot}
                            />
                        )}
                    </Droppable>
                    <hr />
                    <Droppable droppableId="droppableHiddenFields" type={EDIT_FIELDS_DND_TYPE}>
                        {(provided, snapshot) => (
                            <HiddenFieldsDroppable
                                hiddenFields={hiddenFields}
                                provided={provided} snapshot={snapshot}
                            />
                        )}
                    </Droppable>
                    <div className="mt-4">
                        <button
                            className="btn btn-outline btn-raised"
                            onClick={this.handleLeave}
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-outline btn-raised btn-success ml-3"
                            type="button"
                            onClick={this.onSave}
                        >
                            Save
                        </button>
                    </div>
                </DragDropContext>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    ...state.views.classroom.user
})
let mapDispatchToProps = (dispatch) => ({
    setHiddenFields: (fields) => dispatch(setHiddenFields(fields)),
})
EditUserHiddenFields.propTypes = {
    /**
     * Action that should be performed when the dialog
     * gets closed if it is inside a modal
     */
    onClose: PropTypes.func
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUserHiddenFields);