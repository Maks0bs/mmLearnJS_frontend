/*
    Returns the map
    of courses, that the user is subscribed to.
    The map is needed to check in O( log(n) ), if
    a user is subscribed to a certain course
    @prop
 */
export let getUserSubscribedSet = (user) => {
    if (!user.subscribedCourses || !Array.isArray(user.subscribedCourses)){
        return {};
    }
    let result = {};

    for (let c of user.subscribedCourses){
        if (c.course && (typeof c.course._id === 'string') ) {
            result[c.course._id] = true;
        }
    }
    return result;
}

export let transitionStyles = {
    entering: {
        opacity: 0
    },
    entered: {
        opacity: 1,
        transition: 'all 100ms ease-in-out'
    },

    exiting: {
        opacity: 0,
        transition: 'all 100ms ease-in-out'
    },
    exited: {
        opacity: 0
    }
};