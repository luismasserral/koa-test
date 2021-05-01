import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

/**
 * I think it's a better solution to use process env constants to have them
 * centrlized and exported in one simple file. The reason for this is to
 * avoid using `process.env.` in a lot of places so the code is much cleaner,
 * and also to make it easier to test constants.
 */
export const APP_PORT = process.env.APP_PORT;
