import { BlockNote } from "@/components/Editor/types";

// Function to parse FormData to JSON
export function parseFormDataToJson(formData: any): any {
    const state = formData[Object.getOwnPropertySymbols(formData)[0]]; // Access the Symbol('state') property
    const jsonObject = {};
  
    state.forEach((item: any) => {
      // Check if the value is a JSON string and parse it
      try {
          jsonObject[item.name] = JSON.parse(item.value);
      } catch (e) {
        // If it's not JSON, just assign the value directly
        jsonObject[item.name] = item.value;
      }
    });
  
    return jsonObject;
  }

  export function getDeletedBlocks(arr1: any[], arr2: any[]): BlockNote[] {
    //console.log(arr1, arr2)
    // Create a Set from the keys of the second array for faster lookups
    const keys2 = new Set(arr2.map(obj => obj.id));

    // Filter out objects from arr1 whose keys are not present in keys2
    const deletedObjects = arr1.filter(obj => !keys2.has(obj.id));

    return deletedObjects;
}