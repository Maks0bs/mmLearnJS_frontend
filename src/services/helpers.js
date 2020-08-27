import PropTypes from "prop-types";

/**
 * Custom prop types that are used in various components throughout the app
 */
export let customPropTypes = {
    component: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func,
        PropTypes.string
    ]),
    user: PropTypes.oneOfType([
        PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            activated: PropTypes.bool
        }),
        PropTypes.bool
    ])
}

/**
 * @deprecated
 */
export let propTypesByName = {
    authenticatedUser: PropTypes.oneOfType([
        PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            activated: PropTypes.bool
        }),
        PropTypes.bool
    ])
}