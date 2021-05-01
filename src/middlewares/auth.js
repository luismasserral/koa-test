export const validateAccessToken = (ctx, next) => {
  if (ctx.get("X-Bundle-Access-Token") === "token") {
    return next();
  }

  ctx.body = { error: "Unahorized" };
  ctx.status = 401;
};
