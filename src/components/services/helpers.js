/**
 *
 * @param {any[]}list array to reorder
 * @param {number} startIndex the index of the element to remove from the list and put to another position
 * @param {number} endIndex the position we want to insert the new element into
 * @returns {any[]} deep copy of the reordered given array
 */
export let reorderArray = (list, startIndex, endIndex) => {
    let result = Array.from(list);
    let [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
