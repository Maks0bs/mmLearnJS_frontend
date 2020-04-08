import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getItemStyle, getAnswerListStyle } from "./utils";
import Entry from './Entry'

class Section extends Component {
    render(){
        let { name, description, entries, sectionId } = this.props;
        return (
            <Droppable
                droppableId={`section-${sectionId}`}
                type={`section-${sectionId}`}
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
                        {entries.map((entry, index) => {
                            return (
                                <Draggable
                                    key={`${questionNum}${index}`}
                                    draggableId={`${questionNum}${index}`}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <span {...provided.dragHandleProps}>
                                                <div style={{float: 'left'}} >
                                                    grip
                                                </div>
                                            </span>
                                            {answer}
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
