import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { v1 as uuidv1 } from 'uuid'
import { editCourse } from '../services/actions'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import Section from './Section'

class EditPanel extends Component {
	constructor(){
		super()

		this.state = {
			course: {}
		}
	}

	componentDidMount() {
		this.setState({
			course: this.props.oldCourseData
		})
	}

	render() {
		let { course } = this.state;
		let { sections } = course;
		if (!sections){
			return null;
		}
		
		return (
			<DragDropContext
				onDragEnd={(e) => console.log(e)}
			>
				<Droppable droppableId="droppableRoot" type="sections">
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							style={{
                                background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                                padding: 8,
							}}
						>
							{sections.map((section, i) => (
								<Draggable
									key={`section${i}`}
									draggableId={`section${i}`}
									index={i}
								>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											style={{
												padding: '8px',
												userSelect: 'none',
												textAlign: 'right',
												background: snapshot.isDragging ? 
													'lightgreen' : 'grey',
												...provided.draggableProps.style
											}}
										>
											<span {...provided.dragHandleProps} >
												<div style={{float: 'left'}} >
                                                    grip
                                                </div>
											</span>
											<Section
												key={`section${i}`}
												name={section.name}
												entries={section.entries}
												sectionId={i}
											/>

										</div>
									)}
								</Draggable>

							))}
							{provided.placeholder}
							
						</div>
					)}
				</Droppable>
				<hr />
				{JSON.stringify(this.props.oldCourseData)}
			</DragDropContext>
		)
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.edit
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		editCourse: () => dispatch(editCourse())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditPanel);
