import { UserRoles } from "../constants/UserRoles";
import { Role } from "../models/Role";

// -----------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------

/**
 * Helper function to print a separator line to the console.
 */
export const printSeparator = () => {
   console.log("------------------------------------");
};

// -----------------------------------------------------------------------------
// Role-related Functions
// -----------------------------------------------------------------------------

/**
 * Retrieves a role object based on the given role name.
 *
 * @param {string} roleName - The name of the role to retrieve.
 * @returns {Role | undefined} - The role object corresponding to the given name, or undefined if not found.
 */
export const getRoleFromRoleName = (roleName: string): Role | undefined => {
   return Object.values(UserRoles).find((role) => role.name === roleName);
};

// -----------------------------------------------------------------------------
// Array-related Functions
// -----------------------------------------------------------------------------

/**
 * Returns a random slice of the given array with the specified length.
 *
 * @param {any[]} array - The array from which to extract the random slice.
 * @param {number} length - The length of the random slice to extract.
 * @returns {any[]} - A random slice of the array.
 * @throws Will throw an error if the requested length is greater than the length of the array.
 */
export const getRandomSliceFromArray = <T>(array: T[], length: number): T[] => {
   if (length > array.length) {
      throw new Error("Requested length is greater than the array length");
   }

   const startIndex = Math.floor(Math.random() * (array.length - length + 1));
   return array.slice(startIndex, startIndex + length);
};

/**
 * Returns a random value from the given array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array from which to extract the random value.
 * @returns {T} - The random value extracted from the array.
 */
export const getRandomValueFromArray = <T>(array: T[]): T => {
   const randomIndex = Math.floor(Math.random() * array.length);
   return array[randomIndex];
};

/**
 * Returns a completely random subarray from a given array.
 *
 * @param {T[]} array - The array from which to extract the random subarray.
 * @param {number} length - The length of the random subarray to extract.
 * @returns {T[]} - The extracted random subarray.
 * @throws {Error} - If the requested length is greater than the length of the array.
 */
export const getRandomSubarray = <T>(array: T[], length: number): T[] => {
   if (length > array.length) {
      throw new Error(
         "The requested length is greater than the length of the array."
      );
   }

   const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
   return shuffledArray.slice(0, length);
};

/**
 * Paginates an array based on the specified page and limit.
 * @param array The array to paginate.
 * @param page The page number to retrieve (1-indexed).
 * @param limit The maximum number of items per page.
 * @returns The paginated subset of the array based on the page and limit.
 */
export const paginateArray = <T>(
   array: T[],
   page: number,
   limit: number
): T[] => {
   const startIndex = (page - 1) * limit;
   const endIndex = page * limit;

   // Returns the subset of the array based on the pagination limits
   return array.slice(startIndex, endIndex);
};
