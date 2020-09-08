import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faAlignJustify} from "@fortawesome/free-solid-svg-icons";
import {getBeautifulFieldName} from "../../../../../services/helpers";
import {Draggable} from "react-beautiful-dnd";
import PropTypes from "prop-types";

/**
 * Separate items that are used in lists of available/hidden fields,
 * used in
 * {@link components.views.classroom.user.EditUser.EditUserHiddenFields.AvailableFieldsDroppable}
 * or {@link components.views.classroom.user.EditUser.EditUserHiddenFields.HiddenFieldsDroppable}
 * @memberOf components.views.classroom.user.EditUser.EditUserHiddenFields
 * @component
 */
class FieldEntityDraggable extends Component {
    render() {
        let { field, type, num } = this.props;
        return (
            <Draggable
                key={`${type}${num}`}
                draggableId={`${type}${num}`}
                index={num}
                isDragDisabled={field === 'name'}
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            padding: '4px',
                            margin: '4px',
                            userSelect: 'none',
                            background: snapshot.isDragging ?
                                'grey' : 'lightgrey',
                            ...provided.draggableProps.style
                        }}
                    >
                        <div
                            className="float-left mx-2"
                            style={{
                                display: (field === 'name') ? 'none' : 'inline-block'
                            }}
                        >
                            <Icon icon={faAlignJustify}/>
                        </div>
                        {getBeautifulFieldName(field)}
                    </div>
                )}
            </Draggable>
        );
    }
}
FieldEntityDraggable.propTypes = {
    /**
     * The name of the field inside this entity
     */
    field: PropTypes.string.isRequired,
    /**
     * The type of the draggable (which field it refers to,
     * hidden or not)
     */
    type: PropTypes.string.isRequired,
    /**
     * Number of the entity in the droppable list
     */
    num: PropTypes.number.isRequired
}
export default FieldEntityDraggable;