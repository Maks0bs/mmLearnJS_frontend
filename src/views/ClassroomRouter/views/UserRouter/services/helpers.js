export let EDIT_FIELDS_DND_TYPE = 'EDIT_FIELDS_DND_TYPE'

export let USER_FIELDS = [
    "name",
    "email",
    "created",
    "about",
    "role",
    "teacherCourses",
    "enrolledCourses",
    "photo"
]

export let EDITABLE_USER_FIELDS = [
    "name",
    "email",
    "about",
    "newPassword",
    "oldPassword",
    "photo",
    "photoSize",
    "hiddenFields"
]

/**
 * Returns a beautified version of the given field name.
 * @param {string} name - the field name in the 'raw' form from the,
 * just like in the API database
 * @return {string}
 */
export let getBeautifulFieldName = (name) => {
    switch(name){
        case "enrolledCourses":
            return 'enrolled courses'
        case "teacherCourses":
            return "courses as a teacher"
        case "created" :
            return "date when joined";
        default:
            return name;
    }
}

