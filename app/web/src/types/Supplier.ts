export interface Supplier {
    id: string;
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
}
