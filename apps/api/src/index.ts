import Koa from "koa";
import logger from "koa-logger";
import type { Target } from "types";

const app = new Koa();

app.use(logger());

app.use(async (ctx) => {
  ctx.body = { id: Date.now(), speed: 1, direction: "left" } satisfies Target;
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
