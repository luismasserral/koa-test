import Koa from "koa";
import koaBody from "koa-body";

import { APP_PORT } from "./config/env";
import usersDB from "./db/users.json";
import apiRouter from "./api";

const app = new Koa();

/**
 * Of course this is not production ready as its just a JSON, but the idea of
 * putting it here is that the JSON is only imported here and its available
 * for all the controllers using the ctx.
 */
app.context.usersDB = usersDB;

app.use(koaBody());

/**
 * The idea with this approach is that the main file is not need to be modified
 * when adding new routes. So the main router is the one that is going to be
 * changed when adding new endpoints and routes.
 *
 * Also the main idea of the structure of the app is having all the login of
 * every endpoint in its own folder inside the `api` folder, so the first level
 * after the `src` folder is clean to add `utils`, `config` or any other folder
 * to organize the code. If we don't have the `api` folder we would have all
 * the users logic in `src/users` mixed with `src/utils` which for me doesn't
 * make sense and it's not clean and bautiful.
 */
app.use(apiRouter.routes());

app.listen(APP_PORT);
