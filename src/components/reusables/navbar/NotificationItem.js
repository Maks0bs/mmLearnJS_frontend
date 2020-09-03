import React, {Component} from 'react';
import PropTypes from 'prop-types'

/**
 * Notification item for notifications in navigation bar
 * @memberOf components.common
 * @component
 */
class NotificationItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            background: '#ffffff'
        }
    }


    render() {
        let { created, title, text } = this.props;
        return (
            <div
                style={{
                    position: 'relative',
                    padding: '10px',
                    background: this.state.background,
                    width: '100%'
                }}
                onMouseEnter={(e) => {
                    /*
                        Gets highlighted when mouse is hovered over
                    */
                    this.setState({
                        background: '#ebebeb'
                    })
                }}
                onMouseLeave={(e) => {
                    /*
                        Remove highlighting
                    */
                    this.setState({
                        background: '#ffffff'
                    })
                }}
                tabIndex={0}
            >
                <strong>{title}</strong>
                <hr />
                <p>{text}</p>
                <span
                    className="text-muted"
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        fontSize: '8px'
                    }}
                >
                    {/*
                        Display the date, when the notification was created
                    */}
                    {`${(new Date(created)).toLocaleDateString()}, ${(new Date(created)).toLocaleTimeString()}`}
                </span>
            </div>
        );
    }
}

NotificationItem.propTypes = {
    /**
     * The date (and time), when the notification was created.
     * Should be a formatted date string. Gets converted to {@link Date} in the
     * component.
     */
    created: PropTypes.string,

    title: PropTypes.string.isRequired,

    /**
     * The main information of the notification
     */
    text: PropTypes.string
}

export default NotificationItem;