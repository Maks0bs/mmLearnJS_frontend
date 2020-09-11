import React, { Component } from 'react';
import { editSection, preDeleteSection, addSection } from "../services/actions";
import { connect } from 'react-redux'
import PropTypes from "prop-types";

/**
 * This component allows the teacher to edit the given section
 * (normally displayed inside a modal)
 * @memberOf components.views.classroom.course.EditContent
 * @component
 */
class SectionEditor extends Component {
    constructor(props){
        super(props);
        this.state = {name: '', description: ''}
    }

    componentDidMount() {
        if (!this.props.addNew){
            // pre-populate section data
            let section = this.props.newSections[this.props.sectionNum];
            this.setState({name: section.name, description: section.description})
        }
    }

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleLeave = () => this.props.onClose && this.props.onClose();

    onSubmit = (event) => {
        event.preventDefault();
        if (this.props.addNew){
            this.props.addSection({...this.state})
        } else {
            this.props.editSection({...this.state}, this.props.sectionNum);
        }
        this.handleLeave();
    }

    onPreDelete = (event) => {
        event.preventDefault();
        this.props.preDeleteSection(this.props.sectionNum)
        this.handleLeave();
    }

    componentWillUnmount(){
        this.handleLeave();
    }

    render() {
        let { name, description } = this.state;
        let inlineStyle = { display: 'flex', alignItems: 'center' }
        return (
            <div className="container my-5">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group" style={inlineStyle}>
                        <label className="text-muted my-0 mx-2">Name</label>
                        <input
                            onChange={this.handleChange("name")}
                            type="text"
                            className="form-control"
                            value={name}
                        />
                    </div>
                    <div className="form-group" style={inlineStyle}>
                        <label className="text-muted my-0 mx-2">Description</label>
                        <input
                            onChange={this.handleChange("description")}
                            type="text"
                            className="form-control"
                            value={description}
                        />
                    </div>
                    <button
                        className="btn btn-raised ml-3"
                        onClick={this.handleLeave}
                        type="button"
                    >
                        Cancel
                    </button>
                    {!this.props.addNew && (
                        <button
                            className="btn btn-raised btn-danger ml-3"
                            onClick={this.onPreDelete}
                            type="button"
                        >
                            Delete
                        </button>
                    )}
                    {name && (
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
    ...state.views.classroom.course.editContent
})
SectionEditor.propTypes = {
    /**
     * Action that should be performed if this component
     * is inside a modal and it gets closed
     */
    onClose: PropTypes.func,
    /**
     * Should be provided if `newSection` props if falsy
     */
    sectionNum: PropTypes.number,
    /**
     * Should be true if the editor should create a new section at the end of the list
     */
    addNew: PropTypes.bool
}
let mapDispatchToProps = (dispatch) => ({
    editSection: (section, sectionNum) => dispatch(editSection(section, sectionNum)),
    preDeleteSection: (sectionNum) => dispatch(preDeleteSection(sectionNum)),
    addSection: (section) => dispatch(addSection(section))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SectionEditor);