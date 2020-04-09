import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Entry from './Entry'
import { reorder, dndTypes } from '../services/helpers'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons'
let { SECTIONS, ENTRIES } = dndTypes;

class Section extends Component {
    render(){
        let { name, description, entries, sectionId } = this.props;
        return (
            <div>
                <h3>{name}</h3>
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
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
};

export default Section;
