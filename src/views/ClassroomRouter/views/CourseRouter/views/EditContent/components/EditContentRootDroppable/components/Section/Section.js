import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Entry from './components/Entry'
import { connect } from 'react-redux'
import { dndTypes } from '../../services/helpers'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { hideModal, showModal } from '../../../../../../../../components/ModalRoot/services/actions';
import { deleteSection, restoreDeletedSection } from '../../services/actions'
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

    onDelete = (e) => {
        e.preventDefault();
        this.props.deleteSection(
            this.props.sectionId
        )
    }

    onRestore = (e) => {
        e.preventDefault();
        this.props.restoreDeletedSection(
            this.props.sectionId
        )
    }

    render(){
        let { name, description, entries, sectionId, courseId, deleted } = this.props;
        if (this.props.deleted){
            return (
                <div>
                    <p> Deleted section <strong> {name} </strong> </p>
                    <a
                        href="#void"
                        style={{color: 'blue'}}
                        onClick={this.onRestore}
                    > 
                        Restore 
                    </a>
                    <a 
                        href="#void"
                        className="ml-2"
                        style={{color: 'brown'}}
                        onClick={this.onDelete}
                    > 
                        Do not show anymore
                    </a>
                </div>
            )
        }
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

                <a
                    href="#void"
                    onClick={(e) => { e.preventDefault(); this.showAddEntryModal(sectionId)}}
                >
                    <Icon
                        icon={faPlus}
                        className="pr-1"
                    />
                    Add entry
                </a>

            </div>
        );
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        hideModal: () => dispatch(hideModal()),
        showModal: (component) => dispatch(showModal(component)),
        deleteSection: (sectionNum) => dispatch(deleteSection(sectionNum)),
        restoreDeletedSection: (sectionNum) => dispatch(restoreDeletedSection(sectionNum))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Section);