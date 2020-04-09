export let reorder = (list, startIndex, endIndex) => {
	let result = Array.from(list);
	let [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

export let dndTypes = {
	SECTIONS: 'DND_TYPES_SECTIONS',
	ENTRIES: 'DND_TYPES_ENTRIES'
}

export let regExpressions = {
	sectionDroppableId: /(?:section(\d+))$/
}