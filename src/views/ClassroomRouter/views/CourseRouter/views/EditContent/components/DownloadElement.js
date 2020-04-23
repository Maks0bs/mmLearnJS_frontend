import React, { Component } from 'react';
import { getDownloadLink } from '../services/helpers'

class DownloadElement extends Component {
    render() {
        let { id, name } = this.props;
        let link = getDownloadLink(id, name);
        return (
            <a
                href={link}
                download={name}
                style={{
                    color: 'lightblue'
                }}
            >
                {name}
            </a>
        )
    }
}

export default DownloadElement;
