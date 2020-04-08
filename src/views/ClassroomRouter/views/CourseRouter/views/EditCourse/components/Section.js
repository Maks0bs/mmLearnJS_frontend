import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Entry from './Entry'

class Section extends Component {
    render(){
        let { name, description, entries, sectionId } = this.props;
        return (
            <Droppable
                droppableId={`section${sectionId}`}
                type={`section${sectionId}`}
            >
                
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={{
                            padding: '4px',
                            background: snapshot.isDraggingOver ? 
                                'lightblue' : 'lightgrey'
                        }}
                    >
                        <h3>{name}</h3>
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
                                                textAlign: 'right',
                                                background: snapshot.isDragging ?
                                                    'lightgreen' : 'grey',
                                                ...provided.draggableProps.style
                                            }}
                                        >
                                            <span {...provided.dragHandleProps}>
                                                <div style={{float: 'left'}} >
                                                    grip
                                                </div>
                                            </span>
                                            <Entry 
                                                name={entry.name}
                                                type={entry.type}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
};

export default Section;
