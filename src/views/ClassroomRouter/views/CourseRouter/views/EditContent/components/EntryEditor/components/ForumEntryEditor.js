import React, { Component } from 'react';
import { editEntryContent } from "../services/actions";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
/**
 * The editor for entries of `forum` type
 * @memberOf components.views.classroom.course.EditContent.EntryEditor
 * @component
 */
class ForumEntryEditor extends Component {

    handleChange = (name) => (event) => {
        this.props.editEntryContent({
            [name]: event.target.value
        })
    }

    handleTeachersOnly = () => {
        this.props.editEntryContent({
            teachersOnly: !this.props.content.teachersOnly
        })
    }

    render() {
        let { description, teachersOnly } = this.props.content;
        let inlineStyle = { display: 'flex', alignItems: 'center'}
        return (
            <div>
                <div className="form-group" style={inlineStyle}>
                    <label className="text-muted my-0 mx-2">Description</label>
                    <input
                        onChange={this.handleChange("description")}
                        type="text"
                        className="form-control"
                        value={description || ''}
                    />
                </div>
                <div className="form-group" style={inlineStyle}>
                    <label
                        className="text-muted my-0 mx-2"
                        htmlFor="forumOnlyTeachers_editEntry"
                    >
                        Only teachers can post
                    </label>
                    <input
                        id="forumOnlyTeachers_editEntry"
                        type="checkbox"
                        onChange={this.handleTeachersOnly}
                        className="ml-3"
                        checked={teachersOnly}
                    />
                </div>
                {/*Display link to the course if it is already created*/}
                {!this.props.addNew && this.props._id && (
                    <p>
                        Please go to the { }
                        <Link
                            to={`/classroom/course/${this.props.courseId}/forum/${this.props._id}`}
                            target="_blank"
                        >
                            forum page
                        </Link>
                        { } to edit forum topics
                    </p>
                )}
            </div>
        );
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.editContent.entryEditor,
    courseId: state.views.classroom.course.services.course._id
})
let mapDispatchToProps = (dispatch) => ({
    editEntryContent: (data) => dispatch(editEntryContent(data))
})
ForumEntryEditor.propTypes = {
    /**
     * Should be true if the editor should eventually create a new entry
     */
    addNew: PropTypes.bool
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForumEntryEditor);