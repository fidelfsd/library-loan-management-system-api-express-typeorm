import colors from "colors";

// -----------------------------------------------------------------------------

/**
 * Generates a success message to indicate that data seeding has been completed successfully.
 * @param item - Name of the seeded item.
 */
export const printSeederSuccessMessage = (item: string): void => {
   // Calculate the number of dots needed to properly align the message
   const padding = ".".repeat(Math.max(0, 30 - item.length));
   const done = colors.green("DONE");
   console.log(`${item} ${padding} ${done}`);
};
