const BaseData = require('./base-data');
const Order = require('../models/order-model');

class OrdersData extends BaseData {
    constructor(db) {
        super(db, Order);
    }
}

module.exports = OrdersData;