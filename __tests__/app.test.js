const pool = require('../lib/utils/pool');
//const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
    messages: {
        create: jest.fn(),
    },
}));

describe('routes', () => {
    // below resets between each
    beforeEach(() => {
        return setup(pool);
    });

    it('creates a new order in our database and sends a text message', () => {
        return request(app)
            .post('/api/v1/orders')
            .send({ quantity: 10 })
            .then((res) => {
                // expect(createMessage).toHaveBeenCalledTimes(1);
                expect(res.body).toEqual({
                    id: '1',
                    quantity: 10,
                });
            });
    });

    it('gets an order by id', async () => {
        const order = await Order.insert({ quantity: 10 });
        return request(app)
            .get(`/api/v1/orders/${order.id}`)
            .then((res) => {
                expect(res.body).toEqual(order);
            });
    });

    it('gets all orders from db', async () => {
        const order = await Order.insert({ quantity: 10 });
        return request(app)
            .get('/api/v1/orders')
            .then((res) => {
                expect(res.body).toEqual([order]);
            });
    });

    it('updates an order from db by id', async () => {
        const order = await Order.insert({ quantity: 10 });
        return request(app)
            .patch(`/api/v1/orders/${order.id}`)
            .send({ quantity: 11 })
            .then((res) => {
                expect(res.body).toEqual({
                    id: '1',
                    quantity: 11,
                });
            });
    });

    it('deletes an order from db by id', async () => {
        const order = await Order.insert({ quantity: 10 });
        const res = await request(app).delete(`/api/v1/orders/${order.id}`);
        expect(res.body).toEqual({});
    });
});
