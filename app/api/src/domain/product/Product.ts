export class Product {
    constructor(
        public readonly id: string,
        public name: string,
        public description: string,
        public price: number,
        public supplierId: string,
        public isActive: boolean
    ) { }

    changePrice(newPrice: number) {
        if (newPrice <= 0) {
            throw new Error("Price must be greater than zero");
        }
        this.price = newPrice;
    }
}
