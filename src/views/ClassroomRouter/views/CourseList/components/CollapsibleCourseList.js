import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {Transition} from "react-transition-group";
import {transitionStyles} from "../services/helpers";

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
                <a
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
                        style={{
                            float: 'left'
                        }}
                    />
                    <h1>{this.props.listName}</h1>
                </a>
                <Transition
                    in={this.state.showList}
                    timeout={100}
                    unmountOnExit
                    appear
                >
                    {state => (
                        <div
                            style={{
                                ...transitionStyles[state]
                            }}
                        >
                            {this.props.children}
                        </div>
                    )}
                </Transition>

            </div>
        );
    }
}

export default CollapsibleCourseList;