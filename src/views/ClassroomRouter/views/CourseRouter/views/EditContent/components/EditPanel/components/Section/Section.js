import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Entry from './components/Entry'
import { connect } from 'react-redux'
import { reorder, dndTypes } from '../../../../services/helpers'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { hideModal, showModal } from '../../../../../../../../../../components/ModalRoot/services/actions';
import { faAlignJustify, faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import AddEntry from './components/AddEntry'
import EditSection from './components/EditSection'
let { SECTIONS, ENTRIES } = dndTypes;

class Section extends Component {

    showAddEntryModal = (sectionNum) => {
        this.props.showModal(
            <AddEntry 
                onClose={this.props.hideModal} 
                sectionNum={sectionNum}
            />
        )
    }

    showEditSectionModal = () => {
        this.props.showModal(
            <EditSection 
                onClose={this.props.hideModal} 
                sectionNum={this.props.sectionId}
            />
        )
    }

    render(){
        let { name, description, entries, sectionId, courseId } = this.props;
        return (
            <div>
                <Icon 
                    icon={faPencilAlt} 
                    onClick={this.showEditSectionModal}
                    className="float-right m-1"
                    style={{
                        cursor: 'pointer'
                    }}
                />
                <h3>{name}</h3>
                <p>{description}</p>
                
                <Droppable
                    droppableId={`section${sectionId}`}
                    type={ENTRIES}
                >
                    
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{
                                padding: '4px',
                                background: snapshot.isDraggingOver ? 
                                    'lightblue' : ''
                            }}
                        >
                            <div>
                                {entries.map((entry, index) => {
                                    return (
                                        <Draggable
                                            key={`section${sectionId}entry${index}`}
                                            draggableId={`section${sectionId}entry${index}`}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    style={{
                                                        userSelect: 'none',
                                                        padding: '4px',
                                                        margin: '4px',
                                                        background: snapshot.isDragging ?
                                                            'lightgreen' : 'grey',
                                                        ...provided.draggableProps.style
                                                    }}
                                                >
                                                    <span {...provided.dragHandleProps}>
                                                        <div style={{float: 'left'}} >
                                                            <Icon icon={faAlignJustify} />
                                                        </div>
                                                    </span>
                                                    <div className="pl-4">
                                                        <Entry 
                                                            name={entry.name}
                                                            type={entry.type}
                                                            content={entry.content}
                                                            sectionId={sectionId}
                                                            entryId={index}
                                                            id={entry._id || null}
                                                            courseId={courseId}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                            
                        </div>
                        
                    )}
                </Droppable>
                <div 
                    onClick={(e) => this.showAddEntryModal(sectionId)}
                    style={{
                        cursor: 'pointer'
                    }}
                >
                    <Icon 
                        icon={faPlus} 
                        className="pr-1"
                    />
                    <a>Add entry</a>
                </div>

            </div>
        );
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        hideModal: () => dispatch(hideModal()),
        showModal: (component) => dispatch(showModal(component))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Section);
