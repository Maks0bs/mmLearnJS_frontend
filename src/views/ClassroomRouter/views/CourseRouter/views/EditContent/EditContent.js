import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateSectionsLocal, copySectionsFromOldData } from './services/actions'
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import { hideModal, showModal } from '../../../../../../components/ModalRoot/services/actions';
import { cloneDeep } from 'lodash'
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { reorderArray } from "../../../../../../components/services/helpers";
import { dndTypes, regExpressions } from './services/helpers'
import EditActions from "./components/EditContentActions";
import EditCourseRootDroppable from "./components/EditContentRoot";
import EditContentHelp from "./components/EditContentHelp";
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
			<EditContentHelp
				inModal={true}
				onClose={this.props.hideModal}
			/>
		)
	}

	componentDidMount() {
		this.props.initEditing();
	}


	onDragEnd = (result) => {
		if (!result.destination || !this.props.newSections) {
			return;
		}
		if (result.type === SECTIONS) {
			// replace a section
            let sections = reorderArray(
                this.props.newSections,
                result.source.index,
                result.destination.index
            );
            this.props.updateSections(sections);
        } else {
        	if (result.source.droppableId === result.destination.droppableId){
				// replace an entry, the section stays the same
	        	let re = regExpressions.sectionDroppableId;
	        	let sectionId =
					parseInt(re.exec(result.source.droppableId)[1], 10);

	            let entries = reorderArray(
	                this.props.newSections[sectionId].entries,
	                result.source.index,
	                result.destination.index
	            );

	            let sections = cloneDeep(this.props.newSections);
	            sections[sectionId].entries = entries;

	            this.props.updateSections(sections);
	        }
	        else{
				// replace an entry to a different section
	        	let re = regExpressions.sectionDroppableId,
					indexSource = result.source.index,
					indexDest = result.destination.index;
	        	let idSource = parseInt(re.exec(result.source.droppableId)[1], 10),
					idDest = parseInt(re.exec(result.destination.droppableId)[1], 10),
					sections = cloneDeep(this.props.newSections);
	        	let entriesSource = cloneDeep(sections[idSource].entries),
					entriesDest = cloneDeep(sections[idDest].entries),
					element = cloneDeep(sections[idSource].entries[indexSource]);

				entriesSource.splice(indexSource, 1);
				entriesDest.splice(indexDest, 0, element);

				sections[idSource].entries = entriesSource;
				sections[idDest].entries = entriesDest;

				this.props.updateSections(sections);
	        }
        }
	}

	render() {
		console.log('ec', this.props);
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
	initEditing: () => dispatch(copySectionsFromOldData())
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditContent);