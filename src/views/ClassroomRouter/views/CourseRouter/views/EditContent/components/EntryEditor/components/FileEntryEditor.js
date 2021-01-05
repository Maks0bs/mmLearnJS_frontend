import React, { Component } from 'react';
import { editEntryContent } from "../services/actions";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import DownloadElement from "../../../../../../../../../components/reusables/DownloadElement";
/**
 * The editor for entries of `file` type
 * @memberOf components.views.classroom.course.EditContent.EntryEditor
 * @component
 */
class FileEntryEditor extends Component {

    handleFileChange = (e) => {
        if (!e || !e.target || !e.target.files){
            return;
        }
        this.props.editEntryContent({
            fileName: e.target.files[0].name,
            file: e.target.files[0],
            fileIsNew: true
        })
    }

    render() {
        let { addNew, _id } = this.props;
        let { file, fileName, fileIsNew } = this.props.content;
        let inlineStyle = { display: 'flex', alignItems: 'center', flexFlow: 'row wrap'}
        let fileIsUpdated = fileIsNew || !_id
        return (
            <div>
                {file && fileName && (
                    <div>
                        <label className="text-muted mx-2">File:</label>
                        {fileIsUpdated ? (
                            <a href={URL.createObjectURL(file)} download={fileName}>
                                {fileName}
                            </a>
                        ) : (
                            <DownloadElement id={file} name={fileName} linkText={fileName}/>
                        )}
                    </div>
                )}
                <div className="custom-file my-2" style={inlineStyle}>
                    <label className="text-muted my-2 mx-2">
                        {((addNew && !fileIsNew) || !file) ? 'Add ' : 'Replace '} file:
                    </label>
                    <input type="file" onChange={this.handleFileChange}/>
                </div>
            </div>
        );
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.editContent.entryEditor
})
let mapDispatchToProps = (dispatch) => ({
    editEntryContent: (data) => dispatch(editEntryContent(data))
})
FileEntryEditor.propTypes = {
    /**
     * Should be true if the editor should eventually create a new entry
     */
    addNew: PropTypes.bool
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileEntryEditor);