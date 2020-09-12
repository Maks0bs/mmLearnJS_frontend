import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { editEntry, preDeleteEntry, addEntry } from "../../services/actions";
import { editEntryBasicData, editEntryContent, copyDataFromServices } from "./services/actions";
import { connect } from 'react-redux'
import DownloadElement from "../../../../../../../../components/reusables/DownloadElement";
import PropTypes from "prop-types";


// make controlled components

class EditEntry extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '', content: null,
            // Is relevant only for forum type
            teachersOnlyForum: false,
            type: '', access: 'students'
        }

    }

    componentDidMount() {
        /*
            Here entries are handled differently depending on their type:
            Forum:
                state.content = content.description
                separate variable for teachersOnly
            Text:
                state.content = content.text
            File:
                the file itself can only be re-uploaded, that's why
                state.content = new file (if any)
            Only one state variable for different types of content is used to keep
            code more flexible (but, unfortunately it makes it less understandable)
            in the onSubmit method the state gets packed back into
            the form that is suitable for the API
        */
        // let { sectionNum, entryNum } = this.props;
        // let entry = this.props.newSections[sectionNum].entries[entryNum];
        // let entryContent = entry.content;
        // switch (entry.type){
        //     case 'text': {
        //         entryContent = entryContent.text;
        //         break;
        //     }
        //     case 'forum': {
        //         entryContent = entryContent.description;
        //         this.setState({teachersOnlyForum: entry.content.teachersOnly})
        //         break;
        //     }
        // }
        // this.setState({
        //     name: entry.name,
        //     content: entryContent,
        //     access: entry.access
        // })
        this.props.initData(this.props.sectionNum, this.props.entryNum);
    }

    handleChange = (name) => (event) => {
        this.props.editBasicData({
            [name]: event.target.value
        })
    }

    handleTeachersOnlyForum = () => {
        this.setState({
            teachersOnlyForum: !this.state.teachersOnlyForum
        })
    }

    handleLeave = () => this.props.onClose && this.props.onClose();

    onSubmit = (event) => {
        // let oldEntry = this.props.courseData.sections[sectionNum].entries[entryNum];
        // let { type } = oldEntry;
        // let { name, content, access, teachersOnlyForum } = this.state;
        // switch (type){
        //     case 'text': {
        //         content = {
        //             text: content
        //         }
        //         break;
        //     }
        //     case 'forum': {
        //         content = extend(oldEntry.content, {
        //             teachersOnly: teachersOnlyForum,
        //             description: content
        //         });
        //         break;
        //     }
        //     default:
        //         break;
        // }
        event.preventDefault();
        let { sectionNum, entryNum, name, content, access } = this.props;
        this.props.updateEntryInServices(
            { name, content, access },
            sectionNum, entryNum
        )
        this.handleLeave();
    }

    onPreDelete = (event) => {
        event.preventDefault();
        this.props.preDeleteEntry(this.props.sectionNum, this.props.entryNum)
        this.handleLeave();
    }

    handleFileChange = (e) => {
        this.setState({
            content: e.target.files[0]
        })
    }

    componentWillUnmount(){
        this.handleLeave();
    }


    render() {
        let { name, content, access, teachersOnlyForum } = this.state;
        /*if (!name){
            return null;
        }*/
        let { sectionNum, entryNum } = this.props;
        let { type, content: oldContent } = this.props.courseData.sections[sectionNum].entries[entryNum];
        return (
            <div className="container">
                <form  onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input
                            onChange={this.handleChange("name")}
                            type="text"
                            className="form-control"
                            value={name}
                        />
                    </div>

                    {(() => {
                        switch(type) {
                            case 'text':
                                return(
                                    <div className="form-group">
                                        <label className="text-muted">Text</label>
                                        <input
                                            onChange={this.handleChange("content")}
                                            type="text"
                                            className="form-control"
                                            value={content}
                                        />
                                    </div>
                                )
                            case 'file':
                                return (
                                    <div>
                                        {!oldContent.id ? (
                                            <a
                                                href={URL.createObjectURL(oldContent)}
                                                download={oldContent.name}

                                            >
                                                {oldContent.name}
                                            </a>
                                        ) : (
                                            <div>
                                                <label className="text-muted mr-1">Old file:</label>
                                                <DownloadElement
                                                    id={oldContent.id}
                                                    name={oldContent.originalname}
                                                />
                                            </div>
                                        )}
                                        <div className="custom-file mb-2 mt-2">
                                            <label className="text-muted mr-1">Change file:</label>

                                            <input
                                                type="file"
                                                onChange={this.handleFileChange}
                                            />
                                        </div>
                                    </div>
                                )
                            case 'forum':
                                return (
                                    <div>
                                        <div className="form-group">
                                            <label className="text-muted">Description</label>
                                            <input
                                                onChange={this.handleChange("content")}
                                                type="text"
                                                className="form-control"
                                                value={content || ''}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="text-muted">Only teachers can post</label>
                                            <input
                                                type="checkbox"
                                                onChange={this.handleTeachersOnlyForum}
                                                className="ml-3"
                                                checked={teachersOnlyForum}
                                            />
                                        </div>
                                        <p>
                                            Please go to the { }
                                            <Link
                                                to={`/classroom/course/${this.props.courseData._id}/forum/` +
                                                `${this.props.courseData.sections[sectionNum].entries[entryNum]._id}
                                                `}
                                                target="_blank"
                                            >
                                                forum page
                                            </Link>
                                            { } to edit forum content as a teacher there
                                        </p>
                                    </div>
                                )
                        }
                    })()}

                    <div className="form-group">
                        <label className="text-muted mr-2">Choose who has access:</label>
                        <select
                            name="access"
                            value={access}
                            onChange={this.handleChange("access")}
                        >
                            <option value="students">Students and teachers</option>
                            <option value="teachers">Teachers</option>
                        </select>
                    </div>


                    <button
                        className="btn btn-outline btn-raised"
                        onClick={this.handleLeave}
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-outline btn-raised btn-danger ml-3"
                        onClick={this.onPreDelete}
                        type="button"
                    >
                        Delete
                    </button>

                    {(() => {
                        if (type && name){
                            return (
                                <button
                                    className="btn btn-outline btn-raised btn-success ml-3"
                                    type="submit"
                                >
                                    Save
                                </button>
                            )
                        }
                    })()}

                </form>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    ...state.views.classroom.course.editContent.entryEditor
})
let mapDispatchToProps = (dispatch) => ({
    initData: (sectionNum, entryNum) => dispatch(copyDataFromServices(sectionNum, entryNum)),
    updateEntryInServices: (entry, sectionNum, entryNum) =>
        dispatch(editEntry(entry, sectionNum, entryNum)),
    preDeleteEntry: (sectionNum, entryNum) => dispatch(preDeleteEntry(sectionNum, entryNum)),
    editBasicData: (data) => dispatch(editEntryBasicData(data)),
    editEntryContent: (data) => dispatch(editEntryContent(data))
})
EditEntry.propTypes = {
    /**
     * Action that should be performed if this component
     * is inside a modal and it gets closed
     */
    onClose: PropTypes.func,
    /**
     * Should be provided if `addNew` props is falsy
     */
    sectionNum: PropTypes.number,
    /**
     * Should be provided if `addNew` props is falsy
     */
    entryNum: PropTypes.number,
    /**
     * Should be true if the editor should create a new section at the end of the list
     */
    addNew: PropTypes.bool
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditEntry);
