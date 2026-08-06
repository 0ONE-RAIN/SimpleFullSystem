import mongoose from "mongoose";

export class MongoDBConnection {
  private static instance: MongoDBConnection;

  private constructor() {}

  public static getInstance(): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection();
    }
    return MongoDBConnection.instance;
  }

  async connect(uri: string): Promise<void> {
    try {
      await mongoose.connect(uri);
    } catch (err) {
      console.error("Error: connection failed with mongo", err);
      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
    console.log("MongoDB is disconnected");
  }
}
