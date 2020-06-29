export let getUserSubscribedSet = (user) => {
    if (!user.subscribedCourses){
        return {};
    }

    let result = {};

    for (let c of user.subscribedCourses){
        result[c.course._id] = true;
    }

    return result;
}