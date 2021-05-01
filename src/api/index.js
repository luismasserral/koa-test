import Router from "koa-router";

import userRouter from "./users/users.router";

const router = new Router({ prefix: "/api" });

router.use(userRouter.routes());

export default router;
