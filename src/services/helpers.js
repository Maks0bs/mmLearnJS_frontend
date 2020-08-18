import PropTypes from "prop-types";

export let propTypesByName = {
    authenticatedUser: PropTypes.oneOfType([
        PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string
        }),
        PropTypes.bool
    ])
}