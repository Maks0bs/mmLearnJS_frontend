import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

class CourseListItem extends Component {
    constructor(props) {
        super(props);
        this.aboutRef = React.createRef();
        this.state = {
            displayAbout: false
        }
    }


    displayAbout = (e) => {
        if (this.aboutRef && this.aboutRef.current && this.aboutRef.current.contains(e.target)){
            return this.setState({
                displayAbout: e
            })
        }
        if (this.state.displayAbout){
            this.setState({
                displayAbout: false
            })
        }

    }

    componentDidMount() {
        document.addEventListener('touchend', this.displayAbout, false);
        document.addEventListener('mouseover', this.displayAbout, false);
    }

    componentWillUnmount() {
        document.removeEventListener('touchend', this.displayAbout, false);
        document.removeEventListener('mouseover', this.displayAbout, false)
    }


    render() {
        let { course, notifications, subscribed } = this.props;
        let { displayAbout } = this.state;
        return (
            <div
                style={{
                    position: 'relative',
                    display: 'inline-block'
                }}
            >
                <h5
                    style={{
                        float: 'left'
                    }}
                >
                    <Link
                        to={`/classroom/course/${course._id}`}
                    >
                        {subscribed && (
                            <mark
                                style={{
                                    background: 'green'
                                }}
                            >
                                [subscribed]
                            </mark>
                        )}
                        {course.name}
                        {notifications && (
                            <mark
                                style={{
                                    background: 'yellow'
                                }}
                            >
                                {notifications}
                            </mark>
                        )}


                    </Link>

                    {displayAbout && (
                        <div
                            style={{
                                position: 'absolute',
                                left: displayAbout.layerX + 1,
                                top: displayAbout.layerY + 1,
                                MozUserSelect:'none',
                                WebkitUserSelect:'none',
                                msUserSelect: 'none',
                                background: 'gray',
                                color: '#A9A9A9',
                                padding: '4px'
                            }}
                        >
                            About: {course.about}
                        </div>
                    )}


                    <span ref={this.aboutRef}>
                        <Icon

                            onTouchEnd={this.displayAbout}
                            onMouseOver={this.displayAbout}
                            className="ml-3"
                            icon={faInfoCircle}
                        />
                    </span>
                </h5>


            </div>
        );
    }
}

export default CourseListItem;