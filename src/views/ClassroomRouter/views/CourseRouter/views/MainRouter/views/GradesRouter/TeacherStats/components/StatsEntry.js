import React, {Component} from 'react';
import {connect} from "react-redux";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { showModal, hideModal} from "../../../../../../../../../../components/ModalRoot/services/actions";
import StatsDetails from "./StatsDetails";

class TeacherStats extends Component {
    constructor() {
        super();

        this.state = {
            infoColor: '#000000',
            hovered: -1
        }
    }

    onShowDetails = (id) => (e) => {
        e.preventDefault();
        this.props.showModal(
            <StatsDetails
                onClose={this.props.hideModal}
                userNum={this.props.userNum}
                exerciseId={id}
            />
        )
    }

    render() {
        let {exercises} = this.props.courseData;
        let summary = this.props.summaries[this.props.userNum]
        return (
            <tr>
                <th scope="row">{summary.name}</th>
                {exercises.map((e, i) => {
                    let data = this.props.userToExerciseDict[this.props.userId][e._id]
                    return (
                        <td
                            key={i}
                            style={{
                                background: (this.state.hovered === i) ? '#cccbc8' : '#ffffff'
                                // TODO encapsulate every td into a seperate component to enable on hover animation
                            }}

                        >
                            {data ? (
                                <div
                                    style={{
                                        width: '100%',
                                        position: 'relative'
                                    }}
                                >
                                    <span>
                                        <span
                                            style={{
                                                wordBreak: 'keep-all',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            Attempts: {data.attemptsAmount}
                                        </span>
                                        <br />
                                        <span
                                            style={{
                                                wordBreak: 'keep-all',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            Best score: {(data.maxScore === -1) ? 'Pending attempt' : data.maxScore}
                                        </span>
                                        <br />

                                    </span>
                                    <Icon
                                        icon={faInfoCircle}
                                        style={{
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                            cursor: 'pointer',
                                            color: this.state.infoColor
                                        }}
                                        onClick={this.onShowDetails(e._id)}
                                        onMouseEnter={(e) => this.setState({
                                            infoColor: '#66b4d4'
                                        })}

                                        onMouseLeave={(e) => this.setState({
                                            infoColor: '#000000'
                                        })}
                                    />
                                </div>
                            ) : (
                                '-'
                            )}
                        </td>
                    )
                })}
            </tr>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.grades,
        ...state.views.classroom.course.main.services
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        showModal: (component) => dispatch(showModal(component)),
        hideModal: () => dispatch(hideModal())
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeacherStats)