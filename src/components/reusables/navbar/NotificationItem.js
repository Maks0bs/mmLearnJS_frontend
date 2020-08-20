import React, {Component} from 'react';
import PropTypes from 'prop-types'

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
                    this.setState({
                        background: '#ebebeb'
                    })
                }}
                onMouseLeave={(e) => {
                    this.setState({
                        background: '#ffffff'
                    })
                }}
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
                    {`${(new Date(created)).toLocaleDateString()}, ${(new Date(created)).toLocaleTimeString()}`}
                </span>
            </div>
        );
    }
}

NotificationItem.propTypes = {
    created: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string
}

export default NotificationItem;