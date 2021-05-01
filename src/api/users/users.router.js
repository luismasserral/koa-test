import Router from "koa-router";

import { validateAccessToken } from "../../middlewares/auth";
import findUsers from "./controllers/findUsers";

const router = new Router({ prefix: "/users" });

/**
 * The idea of having a folder called controllers instead of a controllers file
 * is that the controller file would begin to grow and grow easily until a
 * point that it would be hard to mantain. So instead of that just one file per
 * controller: easy to find, clean and easier to mantain.
 */
router.get("/", validateAccessToken, findUsers);

export default router;
