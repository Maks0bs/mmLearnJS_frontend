import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {Transition} from "react-transition-group";
import {transitionStyles} from "../services/helpers";
import PropTypes from 'prop-types'

/**
 * Allows to group courses into groups, normally the
 * courses are contained in {@link components.views.classroom.CourseList.CourseListItem}
 *
 * @memberOf components.views.classroom.CourseList
 * @component
 */
class CollapsibleCourseList extends Component {
    constructor(props){
        super(props);

        this.state = {
            showList: false
        }
    }

    handleListClick = (e) => {
        e.preventDefault();
        this.setState({
            showList: !this.state.showList
        })
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <a
                        href="#void"
                        onClick={this.handleListClick}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'darkblue',
                            cursor: 'pointer'
                        }}
                    >
                        <Icon
                            className="fa-2x"
                            icon={this.state.showList ? faCaretDown : faCaretRight}
                            style={{float: 'left'}}
                        />
                        <h1>{this.props.listHeading}</h1>
                    </a>
                </div>

                <Transition
                    in={this.state.showList}
                    timeout={100}
                    unmountOnExit
                    appear
                >
                    {state => (
                        <div style={{...transitionStyles[state]}}>
                            {(this.props.children && this.props.children.length > 0) ? (
                                this.props.children
                            ) : (
                                'No courses here'
                            )}
                        </div>
                    )}
                </Transition>

            </div>
        );
    }
}
CollapsibleCourseList.propTypes = {
    listHeading: PropTypes.node.isRequired
}
export default CollapsibleCourseList;