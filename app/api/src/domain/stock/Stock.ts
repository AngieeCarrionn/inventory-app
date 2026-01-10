export class Stock {
    private constructor(
        private readonly productId: string,
        private quantity: number,
        private location: string
    ) { }

    static create(data: {
        productId: string;
        quantity: number;
        location: string;
    }): Stock {
        return new Stock(
            data.productId,
            data.quantity,
            data.location
        );
    }

    static rehydrate(data: {
        productId: string;
        quantity: number;
        location: string;
    }): Stock {
        return new Stock(
            data.productId,
            data.quantity,
            data.location
        );
    }

    getProductId(): string {
        return this.productId;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getLocation(): string {
        return this.location;
    }

    increase(amount: number): void {
        this.quantity += amount;
    }

    decrease(amount: number): void {
        if (this.quantity < amount) {
            throw new Error("Insufficient stock");
        }
        this.quantity -= amount;
    }
}
