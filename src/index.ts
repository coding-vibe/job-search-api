import "dotenv/config";
import app from "./app";
import logger from "./common/logger";

app.listen(process.env.PORT, () =>
  logger.info(`Server is running on port ${process.env.PORT}`)
);
