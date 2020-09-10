import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faAlignJustify} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

/**
 * Shows help about how to use the course content editor
 * @memberOf components.views.classroom.course.EditContent
 * @component
 */
class EditContentHelp extends Component {

    onClose = (e) => {
        e.preventDefault();
        this.props.onClose && this.props.onClose()
    }

    render() {
        return (
            <div className="container m-5">
                <p>
                    <Icon icon={faAlignJustify} /> { }
                    = Move around sections and entries
                </p>
                {this.props.inModal && (
                    <button
                        className="btn btn-raised m-3"
                        onClick={this.onClose}
                    >
                        Close
                    </button>
                )}
            </div>
        );
    }
}

EditContentHelp.propTypes = {
    /**
     * True if this component is inside a modal. In this
     * case also provide the `onClose` prop as well
     */
    inModal: PropTypes.bool,
    /**
     * The action that should be performed
     * when the user wants to close the modal
     * which contains this component.
     */
    onClose: PropTypes.func
}
export default EditContentHelp;