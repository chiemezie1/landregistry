import crypto from 'node:crypto';

export class Land {
    constructor({ id, location, price, details = {} }) {
        this.id = id || crypto.randomUUID();
        this.location = location;
        this.price = price;
        this.onSale = false;
        this.details = details;
    }

    getData() {
        return {
            id: this.id,
            location: this.location,
            price: this.price,
            onSale: this.onSale,
            details: this.details,
        };
    }
}
