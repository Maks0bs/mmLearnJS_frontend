import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateSectionsLocal, copySectionsFromOldData, cleanup } from './services/actions'
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import { hideModal, showModal } from '../../../../../../components/ModalRoot/services/actions';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { dndTypes, regExpressions } from './services/helpers'
import EditActions from "./components/EditContentActions";
import EditCourseRootDroppable from "./components/EditContentRoot";
import EditorHelp from "../../components/EditorHelp";
import {reorderArrayShallow} from "../../../../../../services/helpers";
let { SECTIONS } = dndTypes;

/**
 * This page allows teachers to edit the their course:
 * add, edit, delete sections and entries
 * @memberOf components.views.classroom.course
 * @component
 */
class EditContent extends Component {

	showHelp = (e) => {
		e.preventDefault();
		this.props.showModal(
			<EditorHelp inModal={true} onClose={this.props.hideModal} type="content"/>
		)
	}

	componentDidMount() {
		this.props.initEditing();
	}

	componentWillUnmount() {
		this.props.cleanup();
	}


	onDragEnd = (result) => {
		if (!result.destination || !this.props.newSections) {
			return;
		}
		if (result.type === SECTIONS) {
			// reorder sections a section
            this.props.updateSections(reorderArrayShallow(
				this.props.newSections,
				result.source.index,
				result.destination.index
			));
        } else {
        	if (result.source.droppableId === result.destination.droppableId){
				// reorder entries in the same section
	        	let re = regExpressions.sectionDroppableId;
	        	let sectionId = parseInt(re.exec(result.source.droppableId)[1], 10);
	        	let sections = [...this.props.newSections];
	            sections[sectionId].entries = reorderArrayShallow(
					sections[sectionId].entries,
					result.source.index,
					result.destination.index
				);
	            this.props.updateSections(sections);
	        }
	        else{
				// reorder entries from different sections
	        	let re = regExpressions.sectionDroppableId,
					indexSource = result.source.index,
					indexDest = result.destination.index;
	        	let idSource = parseInt(re.exec(result.source.droppableId)[1], 10),
					idDest = parseInt(re.exec(result.destination.droppableId)[1], 10),
					sections = [...this.props.newSections]
	        	let entriesSource = [...sections[idSource].entries],
					entriesDest = [...sections[idDest].entries],
					element = {...entriesSource[indexSource]}

				entriesSource.splice(indexSource, 1);
				entriesDest.splice(indexDest, 0, element);

				sections[idSource].entries = entriesSource;
				sections[idDest].entries = entriesDest;

				this.props.updateSections(sections);
	        }
        }
	}

	render() {
		let isMobileWidth = (window.innerWidth <= 1000);
		return (
			<div
				className="container my-5"
				style={{width: isMobileWidth ? '90%' : '70%'}}
			>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'max(90%) minmax(auto, 10%)'
					}}
				>
					<div>
						<DragDropContext onDragEnd={this.onDragEnd}>
							<Droppable
								droppableId="droppableEditCourseRoot"
								type={SECTIONS}
							>
								{(provided, snapshot) => (
									<EditCourseRootDroppable
										provided={provided}
										snapshot={snapshot}
									/>
								)}
							</Droppable>
						</DragDropContext>
					</div>
					<div>
						<a href="#void" onClick={this.showHelp}>
							<Icon className="pr-1" icon={faQuestionCircle} />
							Help
						</a>
					</div>
				</div>
				<hr />
				<EditActions />
			</div>
		)
	}
}

let mapStateToProps = (state) => ({
	...state.views.classroom.course.editContent.services
})
let mapDispatchToProps = (dispatch) => ({
	updateSections: (sections) => dispatch(updateSectionsLocal(sections)),
	hideModal: () => dispatch(hideModal()),
	showModal: (component) => dispatch(showModal(component)),
	initEditing: () => dispatch(copySectionsFromOldData()),
	cleanup: () => dispatch(cleanup())
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditContent);