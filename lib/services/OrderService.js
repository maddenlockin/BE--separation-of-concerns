const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
    //send a text and store the order

    static async createOrder({ quantity }) {
        //send text
        await sendSms(
            process.env.ORDER_HANDLER_NUMBER,
            `New Order received for ${quantity}`
        );

        //store the order
        const order = await Order.insert({ quantity });

        return order;
    }

    static async updateOrder(id, quantity) {
        await sendSms(
            process.env.ORDER_HANDLER_NUMBER,
            `Order updated to ${quantity}`
        );

        const order = await Order.updateOrder(id, quantity);

        return order;
    }
    static async deleteItem(id) {
        await sendSms(
            process.env.ORDER_HANDLER_NUMBER,
            `Order with id: ${id} has been removed`
        );
        const order = await Order.deleteItem(id);
        return order;
    }
    //static async for update and delete order
};
