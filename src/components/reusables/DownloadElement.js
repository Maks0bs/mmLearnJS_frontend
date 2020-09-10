import React, { Component } from 'react';
import {REACT_APP_API_URL} from "../../constants";
import PropTypes from 'prop-types'

/**
 * The component that displays a link to download the file
 * @memberOf components.common
 * @component
 */
class DownloadElement extends Component {
    render() {
        let { id, name, linkText } = this.props;
        let link = `${REACT_APP_API_URL}/files/download/${id}/${name}`
        return (
            <a
                href={link}
                download={name}
            >
                {linkText}
            </a>
        )
    }
}
DownloadElement.propTypes = {
    /**
     * The id of the element that you want to download
     * from the API. See API docs for details
     */
    id: PropTypes.string.isRequired,
    /**
     * The name of the file that is going to be downloaded
     */
    name: PropTypes.string,
    /**
     * The text that should be displayed on the link
     */
    linkText: PropTypes.string
}
export default DownloadElement;
