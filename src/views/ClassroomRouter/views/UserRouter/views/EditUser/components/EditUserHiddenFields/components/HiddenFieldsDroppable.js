import React, {Component} from 'react';
import {Droppable} from "react-beautiful-dnd";
import PropTypes from "prop-types";
import FieldEntityDraggable from "./FieldEntityDraggable";

/**
 * The list with fields that the user wants to set as hidden after closing the
 * modal with the component {@link components.views.classroom.user.EditUser.EditUserHiddenFields}
 * @memberOf components.views.classroom.user.EditUser.EditUserHiddenFields
 * @component
 */
class HiddenFieldsDroppable extends Component {
    render() {
        let { hiddenFields, provided, snapshot } = this.props;
        return (
            <div
                ref={provided.innerRef}
                style={{
                    padding: '4px',
                    background: snapshot.isDraggingOver ? "red" : ""
                }}
            >
                <h4 className="m-2"> Fields to hide: </h4>
                <div className="column" >
                    {hiddenFields.map((field, i) => (
                        <FieldEntityDraggable
                            field={field}
                            num={i}
                            type={'fieldHidden'}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            </div>
        );
    }
}
HiddenFieldsDroppable.propTypes = {
    hiddenFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * See {@link Droppable}
     */
    provided: PropTypes.any.isRequired,
    /**
     * See {@link Droppable}
     */
    snapshot: PropTypes.any.isRequired
}
export default HiddenFieldsDroppable;