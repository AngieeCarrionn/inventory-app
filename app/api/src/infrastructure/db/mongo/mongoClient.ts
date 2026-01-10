import { MongoClient, Db } from "mongodb";

const MONGO_URI =
    process.env.MONGO_URI || "mongodb://localhost:27017/inventory";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectMongo(): Promise<Db> {
    if (db) {
        return db;
    }

    client = new MongoClient(MONGO_URI);
    await client.connect();

    db = client.db(); // 👈 usa la DB de la URI
    return db;
}
