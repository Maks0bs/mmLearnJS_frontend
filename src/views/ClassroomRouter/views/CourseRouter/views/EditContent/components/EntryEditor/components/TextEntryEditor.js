import React, { Component } from 'react';
import { editEntryContent } from "../services/actions";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
/**
 * The editor for entries of `text` type
 * @memberOf components.views.classroom.course.EditContent.EntryEditor
 * @component
 */
class TextEntryEditor extends Component {

    handleChange = (name) => (event) => {
        this.props.editEntryContent({
            [name]: event.target.value
        })
    }

    render() {
        let { text } = this.props.content;
        let inlineStyle = { display: 'flex', alignItems: 'center'}
        return (
            <div className="form-group" style={inlineStyle}>
                <label className="text-muted my-0 mx-2">Content</label>
                <textarea
                    onChange={this.handleChange("text")}
                    className="form-control"
                    style={{
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        borderColor: 'gray'
                    }}
                    value={text || ''}
                />
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
TextEntryEditor.propTypes = {
    /**
     * Should be true if the editor should eventually create a new entry
     */
    addNew: PropTypes.bool
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextEntryEditor);