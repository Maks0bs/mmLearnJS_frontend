import PropTypes from "prop-types";

/**
 * @description <b>Shallowly</b> put one element at `startIndex` to the
 * `endIndex` position, shifting all other elements. Imagine it
 * like grabbing element at `startIndex` and dropping it off
 * at the position `endIndex`
 * @function
 * @param {any[]} arr array to reorder
 * @param {number} startIndex the index of the element
 * to remove from the list and put to another position
 * @param {number} endIndex the position we want to insert the new element into
 * @returns {any[]} deep copy of the reordered given array
 */
export let reorderArrayShallow = (arr, startIndex, endIndex) => {
    let result = [...arr]
    let [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

/**
 * @description <b>Shallowly</b> remove element from given array
 * @function
 * @param {any[]} arr
 * @param {number} index
 * @returns {any[]} deep copy of the reordered given array
 */
export let removeItemShallow = (arr, index) => {
    return [
        ...arr.slice(0, index),
        ...arr.slice(index + 1)
    ]
};

/**
 * @description <b>Shallowly</b> add element to given array
 * @function
 * @param {any[]} arr array to reorder
 * @param {number} index
 * @param {any} element
 * @returns {any[]} deep copy of the reordered given array
 */
export let addItemShallow = (arr, index, element) => {
    return [
        ...arr.slice(0, index),
        element,
        ...arr.slice(index)
    ]
};

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
    },
    scaleTop: {
        entering: {
            opacity: 1,
            transform: 'scaleY(0.4)',
            transformOrigin: '100% 0%',
            transitionDuration: '50ms'
        },
        entered: {
            opacity: 1,
            transform: 'scaleY(1)',
            transformOrigin: '100% 0%',
            transitionDuration: '50ms'
        },
        exiting: {
        },
        exited: {
        }
    },
    heightExpand: {
        entering: {
        },
        entered: {
            height: 'auto',
            overflow: 'visible'
        },
        exiting: {
            opacity: 0,
            transition: 'height 2s'
        },
        exited: {
            transition: 'height 2s',
            height: 0,
        }
    }
};