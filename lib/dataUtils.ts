/**
 * Checks if an element with a specific id is already in an array.
 * @param {Array} array - The array to search.
 * @param {string|number} id - The id to check for.
 * @returns {boolean} - Returns true if an element with the id exists, otherwise false.
 */
export const isElementInArrayById = (array: any[], id: string) => {
    return array.some(element => element.id === id);
  };

/**
 * Gets an element with a specific id from an array.
 * @param {Array} array - The array to search.
 * @param {string|number} id - The id to search for.
 * @returns {Object|undefined} - Returns the element with the specified id, or undefined if not found.
 */
export const getElementInArrayById = (array: any[], id: string) => {
    return array.find(element => element.id === id);
};

export const mergeElements = (array: any[], elements: any[]) => {
    console.log(array, elements);
    for (const item of elements){
        if(isElementInArrayById(array, item.id))
            continue;
        array.push(item);
    }
    console.log(array)
    return array;
}

/**
 * Replaces an element in an array by matching the id property.
 * @param {Array} array - The array to search.
 * @param {Object} element - The new element to replace the old one.
 * @returns {Array} - The updated array with the element replaced.
 */
export const replaceElement = (array: any[], element: any) => {
    return array.map(item => item.id === element.id ? element : item);
}