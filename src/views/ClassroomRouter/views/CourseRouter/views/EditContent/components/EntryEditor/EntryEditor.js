import React, { Component } from 'react';
import { editEntry, preDeleteEntry, addEntry } from "../../services/actions";
import { copyDataFromServices, clearEntry, editEntryBasicData} from "./services/actions";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import TextEntryEditor from "./components/TextEntryEditor";
import ForumEntryEditor from "./components/ForumEntryEditor";
import FileEntryEditor from "./components/FileEntryEditor";
/**
 * This component allows the teacher to edit the given entry
 * (normally displayed inside a modal)
 * @memberOf components.views.classroom.course.EditContent
 * @component
 */
class EntryEditor extends Component {

    componentDidMount() {
        if (!this.props.addNew){
            // pre-populate entry data if it is edited, not added
            this.props.initData(this.props.sectionNum, this.props.entryNum);
        }
    }

    handleChange = (name) => (event) => {
        // we don't need to clear content data when the type is changed
        // all types have different attributes in content
        // not clearing content allows to persist its data even if type is changed
        this.props.editBasicData({
            [name]: event.target.value
        })
    }

    handleLeave = () => this.props.onClose && this.props.onClose();

    onSubmit = (event) => {
        event.preventDefault();
        let { sectionNum, entryNum, name, content, access, addNew, kind } = this.props;
        if (addNew){
            this.props.addEntry(
                {name, content, access, kind},
                sectionNum
            )
        }
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

    componentWillUnmount(){
        this.props.clearEntry();
        this.handleLeave();
    }

    render() {
        let { name, access, kind, addNew, editorError: error } = this.props;
        let inlineStyle = { display: 'flex', alignItems: 'center'}
        return (
            <div className="container my-3">
                {error && (
                    <div className="alert alert-danger">
                        Error loading entry data. Please try again
                    </div>
                )}
                <h1 className="mb-3">{addNew ? 'Add ' : 'Edit '} Entry</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group" style={{...inlineStyle, flexFlow: 'row wrap'}}>
                        {addNew && (
                            <select
                                name="kind"
                                style={{padding: '5px'}}
                                value={kind}
                                onChange={this.handleChange("kind")}
                            >
                                <option value="">Choose entry type</option>
                                <option value="EntryFile">File</option>
                                <option value="EntryForum">Forum</option>
                                <option value="EntryText">Text</option>
                            </select>
                        )}
                        <div style={inlineStyle}>
                            <label className="text-muted my-0 mx-2">Name</label>
                            <input
                                onChange={this.handleChange("name")}
                                type="text"
                                className="form-control"
                                value={name}
                            />
                        </div>
                    </div>
                    {(() => {
                        switch (kind){
                            case 'EntryText':
                                return (<TextEntryEditor addNew={addNew}/>)
                            case 'EntryFile':
                                return (<FileEntryEditor addNew={addNew}/> )
                            case 'EntryForum':
                                return (<ForumEntryEditor addNew={addNew}/>)
                            default:
                                return null
                        }
                    })()}
                    <div className="form-group" style={{...inlineStyle, flexFlow: 'row wrap'}}>
                        <label className="text-muted my-2 mx-2">Choose who has access:</label>
                        <select
                            name="access"
                            value={access}
                            style={{padding: '5px'}}
                            onChange={this.handleChange("access")}
                        >
                            <option value="students">Students and teachers</option>
                            <option value="teachers">Teachers</option>
                        </select>
                    </div>
                    <hr />
                    <button
                        className="btn btn-raised ml-3"
                        onClick={this.handleLeave}
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-raised btn-danger ml-3"
                        onClick={this.onPreDelete}
                        type="button"
                    >
                        Delete
                    </button>
                    {kind && name && access && (
                        <button
                            className="btn btn-raised btn-success ml-3"
                            type="submit"
                        >
                            Save
                        </button>
                    )}
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
    addEntry: (data, sectionNum) => dispatch(addEntry(data, sectionNum)),
    clearEntry: () => dispatch(clearEntry())
})
EntryEditor.propTypes = {
    /**
     * Action that should be performed if this component
     * is inside a modal and it gets closed
     */
    onClose: PropTypes.func,
    sectionNum: PropTypes.number.isRequired,
    /**
     * Should be provided if `addNew` props is falsy
     */
    entryNum: PropTypes.number,
    /**
     * Should be true if the editor should create a new entry at the end of the given section
     */
    addNew: PropTypes.bool
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EntryEditor);