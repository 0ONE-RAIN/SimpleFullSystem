import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoDBConnection } from "./infrastructure/persistence/database/mongodb/connection.js";
import userRouter from "./application/routes/user.routes.js";
import { errorHandler } from "./infrastructure/http/middleware/errorHandler.middleware.js";

dotenv.config();

class Server {
  private app: express.Express;
  private port: string;
  private mongoConnection: MongoDBConnection;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.mongoConnection = MongoDBConnection.getInstance();
    this.initMiddlewares();
    this.initRoutes();
  }

  private initMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initRoutes(): void {
    this.app.use("/usuarios", userRouter);
    this.app.get("/health", (_req, res) => {
      res.status(200).json({ status: "OK", message: "Server is running" });
    });
    this.app.use(errorHandler);
  }

  async start(): Promise<void> {
    try {
      const mongoURI = process.env.MONGO_URL || "";
      await this.mongoConnection.connect(mongoURI);
      this.app.listen(this.port, () => {
        console.log(`Server running on port ${this.port}`);
      });
    } catch (err) {
      console.error("Failed to start server:", err);
      process.exit(1);
    }
  }

  async stop(): Promise<void> {
    await this.mongoConnection.disconnect();
  }
}

const server = new Server();
server.start();
export default server;
