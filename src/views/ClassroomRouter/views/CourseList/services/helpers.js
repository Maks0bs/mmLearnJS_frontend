/**
 * Gets the map of courses, that the user is subscribed to.
 * The map is necessary to check if a user is subscribed
 * to a certain course in O( log(n) ) time
 * @param {Object[]} courses - the list of courses that the
 * user is subscribed to
 * @return {Object}
 */
export let getUserSubscribedSet = (courses) => {
    if (!courses || !Array.isArray(courses)){
        return {};
    }
    let result = {};

    for (let c of courses){
        if (c.course && (typeof c.course._id === 'string') ) {
            result[c.course._id] = true;
        }
    }
    return result;
}

export let LIST_TYPES = [
    'open', 'enrolled', 'teacher'
]