export class Stock {
    constructor(
        public readonly productId: string,
        private quantity: number
    ) { }

    getQuantity() {
        return this.quantity;
    }

    increase(qty: number) {
        if (qty <= 0) throw new Error("Quantity must be positive");
        this.quantity += qty;
    }

    decrease(qty: number) {
        if (qty <= 0) throw new Error("Quantity must be positive");
        if (this.quantity < qty) {
            throw new Error("Insufficient stock");
        }
        this.quantity -= qty;
    }
}
