import express from "express";
export const app = express();
import { reqResLogger } from "./logger/req_res_logger";
import { errorHandler } from "./middleware/logger_middleware";
import router from "./routers/api_routes";

app.use(reqResLogger);
app.use("/api", router);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app
  .listen(port, () => {
    console.log(`server running at port : ${port}`);
  })
  .on("error", (e) => {
    console.log("Error : ", e.message);
  });
