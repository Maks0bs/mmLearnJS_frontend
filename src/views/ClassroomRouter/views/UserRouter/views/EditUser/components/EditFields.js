import React, {Component} from 'react';
import { connect } from 'react-redux'
import { setHiddenFields } from "../../../services/actions";
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { EDIT_FIELDS_DND_TYPE, USER_FIELDS } from "../../../services/helpers";
import { reorderArray } from "../../../../../../../components/services/helpers";

class EditFields extends Component {
    constructor() {
        super();

        this.state = {
            hiddenFields: [],
            availableFields: []
        }
    }

    componentDidMount() {


        let availableFields = [];
        for (let f of USER_FIELDS){
            if (f === 'teacherCourses' && this.props.user.role === 'student'){
                continue;
            }
            if (!this.props.newHiddenFields.includes(f)){
                availableFields.push(f);
            }
        }

        this.setState({
            hiddenFields: this.props.newHiddenFields,
            availableFields: availableFields
        })
    }

    handleLeave = () => {
        this.props.onClose && this.props.onClose();
    }

    componentWillUnmount(){
        this.handleLeave();
    }

    onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        let newHiddenFields = [...this.state.hiddenFields], newAvailableFields = [...this.state.availableFields]

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
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <Droppable droppableId="droppableAvailableFields" type={EDIT_FIELDS_DND_TYPE}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{
                                background: snapshot.isDraggingOver ? "lightblue" : ""
                            }}
                        >
                            <h4 className="m-2"> Fields to display to other users: </h4>
                            <div className="column" >
                                {availableFields.map((field, i) => {
                                    return (
                                        <Draggable
                                            key={`fieldAvailable${i}`}
                                            draggableId={`fieldAvailable${i}`}
                                            index={i}
                                            isDragDisabled={field === 'name'}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        padding: '4px',
                                                        userSelect: 'none',
                                                        background: snapshot.isDragging ?
                                                            'grey' : 'lightgrey',
                                                        ...provided.draggableProps.style
                                                    }}
                                                >
                                                    <div
                                                        className="float-left mx-2"
                                                        style={{
                                                            display: (field === 'name') ? 'none' : ''
                                                        }}
                                                    >
                                                        <Icon icon={faAlignJustify}/>
                                                    </div>
                                                    {field}
                                                </div>
                                            )}
                                        </Draggable>
                                    )

                                })}
                                {provided.placeholder}
                            </div>

                        </div>
                    )}
                </Droppable>
                <hr />
                <Droppable droppableId="droppableHiddenFields" type={EDIT_FIELDS_DND_TYPE}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{
                                background: snapshot.isDraggingOver ? "lightblue" : ""
                            }}
                        >
                            <h4 className="m-2"> Fields to hide: </h4>
                            <div className="column" >
                                {hiddenFields.map((field, i) => (
                                    <Draggable
                                        key={`fieldHidden${i}`}
                                        draggableId={`fieldHidden${i}`}
                                        index={i}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    padding: '4px',
                                                    userSelect: 'none',
                                                    background: snapshot.isDragging ?
                                                        'grey' : 'lightgrey',
                                                    ...provided.draggableProps.style,

                                                }}
                                            >
                                                <div className="float-left mx-2">
                                                    <Icon icon={faAlignJustify}/>
                                                </div>
                                                {field}
                                            </div>
                                        )}
                                    </Draggable>


                                ))}
                                {provided.placeholder}
                            </div>

                        </div>
                    )}
                </Droppable>

                <br />
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
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.user
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setHiddenFields: (fields) => dispatch(setHiddenFields(fields)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditFields);