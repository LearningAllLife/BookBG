/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len,eol-last*/
class OrdersControllerAPI {
    constructor(data) {
        this.data = data;
    }
    getAll(req, res) {
        return this.data.orders.getAll()
            .then((orders) => {
                return res.json(orders);
            });
    }
}
const init = (data) => {
    return new OrdersControllerAPI(data);
};

module.exports = { init };