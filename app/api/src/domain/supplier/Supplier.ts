export interface SupplierAddress {
    street: string;
    city: string;
    country: string;
}

export interface SupplierContact {
    email: string;
    phone: string;
}

export class Supplier {
    constructor(
        public readonly id: string,
        public name: string,
        public address: SupplierAddress,
        public contact: SupplierContact,
        public readonly createdAt: Date = new Date()
    ) { }

    updateContact(contact: SupplierContact) {
        this.contact = contact;
    }
}
