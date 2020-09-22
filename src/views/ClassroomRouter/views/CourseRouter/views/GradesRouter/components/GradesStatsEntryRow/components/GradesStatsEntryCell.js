import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import {connect} from "react-redux";

/**
 * This component displays a row of basic information about the
 * participation of the given user in one certain exercise
 * should always be a child of
 * {@link components.views.classroom.course.grades.GradesStatsEntryRow}
 * @memberOf components.views.classroom.course.grades.GradesStatsEntryRow
 * @component
 */
class GradesStatsEntryCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoColor: '#000000',
            hoverColor: ''
        }
    }

    onShowDetails = (e) => {
        e.preventDefault();
        this.props.onShowDetails();
    }


    render() {
        let {userToExerciseDict, userId, exerciseId} = this.props;
        let exerciseDict = userToExerciseDict[userId];

        if (!exerciseDict || !exerciseDict[exerciseId]){
            return (<td>-</td>);
        }
        let { attempts, maxScore } = exerciseDict[exerciseId];
        return (
            <td
                style={{background: this.state.hoverColor}}
                onMouseEnter={() => this.setState({hoverColor: 'lightgray'})}
                onMouseLeave={() => this.setState({hoverColor: ''})}
            >
                <div style={{ width: '100%', position: 'relative'}}>
                    <Icon
                        className="float-right"
                        icon={faInfoCircle}
                        style={{
                            cursor: 'pointer',
                            color: this.state.infoColor
                        }}
                        onClick={this.onShowDetails}
                        onMouseEnter={() => this.setState({infoColor: 'blue'})}
                        onMouseLeave={() => this.setState({infoColor: '#000000'})}
                    />
                    <span>
                        <span
                            style={{
                                wordBreak: 'keep-all',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Attempts: {attempts.length}
                        </span>
                        <br />
                        <span
                            style={{
                                wordBreak: 'keep-all',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Best score:
                            {(maxScore < 0) ?
                                'Pending attempt'
                                : maxScore
                            }
                        </span>
                        <br />
                    </span>
                </div>
            </td>
        );
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.grades
})
GradesStatsEntryCell.propTypes = {
    userId: PropTypes.string.isRequired,
    exerciseId: PropTypes.string.isRequired,
    /**
     * Function that should be performed if the
     * user decides to view details about the
     * given student's participation in the given exercise
     */
    onShowDetails: PropTypes.func
}
export default connect(
    mapStateToProps
)(GradesStatsEntryCell)