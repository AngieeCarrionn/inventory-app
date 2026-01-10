import { MongoClient, Db } from "mongodb";

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const DB_NAME = "inventory_db";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectMongo(): Promise<Db> {
    if (db) {
        return db;
    }

    client = new MongoClient(MONGO_URL);
    await client.connect();

    db = client.db(DB_NAME);
    return db;
}
