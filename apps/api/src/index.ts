import Koa from "koa";
import logger from "koa-logger";
import type { TargetDTO } from "types";

const app = new Koa();

app.use(logger());

app.use(async (ctx) => {
  ctx.body = {
    id: Date.now(),
    duration: 15000,
    direction: "left",
  } satisfies TargetDTO;
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
