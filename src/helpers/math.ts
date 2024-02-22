/**
 * Generates a random integer within the specified range, including the endpoints.
 */
export const generateRandomInteger = (min: number, max: number): number => {
   if (min > max) {
      throw new Error(
         "The minimum value must be less than or equal to the maximum value."
      );
   }

   return Math.floor(Math.random() * (max - min + 1)) + min;
};
