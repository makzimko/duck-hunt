import Koa from "koa";
import logger from "koa-logger";
import type { TestResponse } from "types";

const app = new Koa();

app.use(logger());

app.use(async (ctx) => {
  ctx.body = { hello: "world" } satisfies TestResponse;
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
