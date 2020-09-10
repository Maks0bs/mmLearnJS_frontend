import React, {Component} from 'react';
import {Droppable} from "react-beautiful-dnd";
import PropTypes from 'prop-types'
import FieldEntityDraggable from "./FieldEntityDraggable";

/**
 * The list with fields that the user wants to set available after closing the
 * modal with the component {@link components.views.classroom.user.EditUser.EditUserHiddenFields}
 * @memberOf components.views.classroom.user.EditUser.EditUserHiddenFields
 * @component
 */
class AvailableFieldsDroppable extends Component {
    render() {
        let { availableFields, provided, snapshot } = this.props;
        return (
            <div
                ref={provided.innerRef}
                style={{
                    padding: '4px',
                    background: snapshot.isDraggingOver ? "green" : ""
                }}
            >
                <h4 className="m-2"> Fields to display to other users: </h4>
                <div className="column" >
                    {availableFields.map((field, i) => (
                        <FieldEntityDraggable
                            key={i}
                            field={field}
                            num={i}
                            type={'fieldAvailable'}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            </div>
        );
    }
}
AvailableFieldsDroppable.propTypes = {
    availableFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * See {@link Droppable}
     */
    provided: PropTypes.any.isRequired,
    /**
     * See {@link Droppable}
     */
    snapshot: PropTypes.any.isRequired
}
export default AvailableFieldsDroppable;