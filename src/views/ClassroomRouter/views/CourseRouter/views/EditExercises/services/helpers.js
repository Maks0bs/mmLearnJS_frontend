import {v1 as uuidv1} from "uuid";

export let dndTypes = {
	EXERCISES: 'DND_TYPES_EXERCISES',
}

export let regExpressions = {
	exerciseDroppableId: /(?:exercise(\d+))$/
}

/**
 * @description returns a new semi-pre-configured new task of given type
 * @param {string} type
 * @return CourseTask
 */
export let newTaskByType = (type) => {
	let newTask;
	switch(type){
		case 'OneChoice': {
			newTask = {
				description: 'Describe the one-choice task',
				score: 1,
				kind: 'OneChoiceTask',
				options: [
					{
						text: 'Option 1',
						key: uuidv1()
					}
				]
			}
			break;
		}
		case 'MultipleChoice': {
			newTask = {
				description: 'Describe the multiple-choice task',
				score: 1,
				kind: 'MultipleChoiceExercise',
				options: [
					{
						text: 'Option 1',
						key: uuidv1()
					}
				],
				correctAnswers: [],
				onlyFull: false
			}
			break;
		}
		case 'Text': {
			newTask = {
				description: 'Describe the task with open text answer',
				score: 1,
				kind: 'TextExercise',
				interpretMath: false,
				correctAnswers: [
					'Sample answer'
				]
			}
			break;
		}
		default: {
			newTask = {}
		}
	}
	return newTask;
}