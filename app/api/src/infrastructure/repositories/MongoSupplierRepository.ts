import { Collection } from "mongodb";
import { Supplier } from "../../domain/supplier/Supplier";
import { SupplierRepository } from "../../domain/supplier/SupplierRepository";
import { connectMongo } from "../db/mongo/mongoClient";

type SupplierDocument = {
    _id: string;
    name: string;
    address: {
        street: string;
        city: string;
        country: string;
    };
    contact: {
        email: string;
        phone: string;
    };
    createdAt: Date;
};

export class MongoSupplierRepository implements SupplierRepository {

    private async getCollection(): Promise<Collection<SupplierDocument>> {
        const db = await connectMongo();
        return db.collection<SupplierDocument>("suppliers");
    }

    async save(supplier: Supplier): Promise<void> {
        const collection = await this.getCollection();

        await collection.insertOne({
            _id: supplier.getId(),
            name: supplier.getName(),
            address: supplier.getAddress(),
            contact: supplier.getContact(),
            createdAt: new Date()
        });
    }

    async findAll(): Promise<Supplier[]> {
        const collection = await this.getCollection();
        const docs = await collection.find().toArray();

        return docs.map(doc =>
            Supplier.rehydrate({
                id: doc._id,
                name: doc.name,
                address: doc.address,
                contact: doc.contact
            })
        );
    }

    async findById(id: string): Promise<Supplier | null> {
        const collection = await this.getCollection();
        const doc = await collection.findOne({ _id: id });

        if (!doc) {
            return null;
        }

        return Supplier.rehydrate({
            id: doc._id,
            name: doc.name,
            address: doc.address,
            contact: doc.contact
        });
    }
}
