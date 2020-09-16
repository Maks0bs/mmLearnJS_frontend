import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faArrowsAlt, faPencilAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

/**
 * Shows help about how to use the course editors
 * @memberOf components.views.classroom.course
 * @component
 */
class EditorHelp extends Component {

    onClose = (e) => {
        e.preventDefault();
        this.props.onClose && this.props.onClose()
    }

    render() {
        let { type } = this.props;
        return (
            <div className="container my-3 text-center">
                <h1>Help</h1>
                {type === 'content' ? (
                    <div>
                        <p>
                            <Icon icon={faArrowsAlt} /> { }
                            = Move around sections and entries
                        </p>
                        <p>
                            <Icon icon={faPencilAlt} /> { }
                            = Edit section or entry
                        </p>
                        <p>
                            Entries can be moved inside the section
                            and from one section to another.
                        </p>
                    </div>
                ) : (
                    <div>
                        <p>
                            <Icon icon={faArrowsAlt} /> { }
                            = Move around exercises
                        </p>
                        <p>
                            <Icon icon={faTrashAlt} /> { }
                            = Delete exercise
                        </p>
                    </div>
                )}
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

EditorHelp.propTypes = {
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
    onClose: PropTypes.func,
    type: PropTypes.string.isRequired
}
export default EditorHelp;