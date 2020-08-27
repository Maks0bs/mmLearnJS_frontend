import PropTypes from "prop-types";

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