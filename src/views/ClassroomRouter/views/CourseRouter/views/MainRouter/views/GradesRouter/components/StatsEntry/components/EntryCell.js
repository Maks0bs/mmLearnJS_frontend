import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

class EntryCell extends Component {
    constructor() {
        super();

        this.state = {
            infoColor: '#000000',
            hoverColor: ''
        }
    }


    render() {
        let { data } = this.props;
        return (
            <td
                style={{
                    background: this.state.hoverColor
                }}
                onMouseEnter={(e) => this.setState({
                    hoverColor: 'lightgray'
                })}
                onMouseLeave={(e) => this.setState({
                    hoverColor: ''
                })}

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
                            onClick={this.props.onShowDetails}
                            onMouseEnter={(e) => this.setState({
                                infoColor: 'blue'
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
        );
    }
}

export default EntryCell;