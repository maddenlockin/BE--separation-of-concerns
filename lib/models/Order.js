const pool = require('../utils/pool');

module.exports = class Order {
    // id;
    // quantity;

    constructor(row) {
        this.id = row.id;
        this.quantity = row.quantity;
    }

    static async insert({ quantity }) {
        const { rows } = await pool.query(
            'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
            [quantity]
        );
        return new Order(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM orders WHERE id = $1',
            [id]
        );
        return new Order(rows[0]);
    }

    static async getOrders() {
        const { rows } = await pool.query('SELECT * from orders');
        return rows.map((row) => new Order(row));
    }

    static async updateOrder(id, quantity) {
        //console.log('quantity:   ', quantity);
        const { rows } = await pool.query(
            'UPDATE orders SET quantity=$2 WHERE id=$1 RETURNING *',
            [id, quantity]
        );
        return new Order(rows[0]);
    }

    static async deleteOrder(id) {
        const { rows } = await pool.query(
            'DELETE FROM orders WHERE id=$1', 
            [id],
        );
        return rows[0];
    }
};

