export let getUserSubscribedSet = (user) => {
    if (!user.subscribedCourses){
        return {};
    }

    let result = {};

    for (let c of user.subscribedCourses){
        if (c.course){
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