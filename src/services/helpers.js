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
export let transitionStyles = {
    fade: {
        entering: {
            opacity: 0
        },
        entered: {
            opacity: 1,
            transition: 'all 150ms ease-in-out'
        },
        exiting: {
            opacity: 0,
            transition: 'all 150ms ease-in-out'
        },
        exited: {
            opacity: 1
        }
    },
    scaleDownBottom: {
        entering: {
            opacity: 0,
            transform: 'translateY(-10px) scale(0.7)',
        },
        entered: {
            opacity: 1
        },
        exiting: {
            opacity: 1,
            transform: 'scale(0.7) translateY(10px)'
        },
        exited: {
            opacity: 0
        },

    }
};