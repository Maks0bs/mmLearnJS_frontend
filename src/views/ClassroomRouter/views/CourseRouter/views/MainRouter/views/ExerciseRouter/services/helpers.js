/**
 * @param courseData the data to look for the exercise in
 * @param id the id of the wanted exercise
 * @return {number} the position of the exercise in courseData.exercises with the given id,
 *                  -1 if no such exercise was found
 */
export let getExercisePositionById = (courseData, id) => {
    for (let i = 0; i < courseData.exercises.length; i++){
        let cur = courseData.exercises[i];
        if (cur._id === id){
            return i;
        }
    }

    return -1;
}
