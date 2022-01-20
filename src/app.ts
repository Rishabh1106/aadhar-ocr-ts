import express from "express";
const app = express();
import { reqResLogger } from "./logger/req_res_logger";
import { errorResponder } from "./middleware/errorMiddleware";
import { errorLoggerWinston } from "./middleware/loggerMiddleware";
import router from "./routers/apiRoutes";

//app.use(reqResLogger);

app.use("/api", router);

app.use(errorLoggerWinston);
app.use(errorResponder);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running at port : ${port}`);
});
