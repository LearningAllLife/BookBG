class OrdersCotroller {
    constructor(data) {
        this.data = data;
    }

    returnAll(req, res) {
        this.data.orders.getAll()
            .then((orders) => {
                if (typeof orders === 'undefined' || orders === null) {
                    throw Error('No orders');
                }
                res.render('orders/allOrders.pug');
            });
    }

    create(req, res) {
        const order = req.body;
        if (typeof order === 'undefined') {
            throw new Error("Invalid order");
        }

        return this.data.genres.create(order)
            .then(() =>
                res.redirect('/success')
            )
            .catch((err) => {
                // connect-flash
                req.flash('error', err.message);
            });
    }
    registerOrder(req, res) {
        const ids = req.body.ids.split('|');
        let books = [];
        for (const id of ids) {
            books.push(this.data.books.getById(id));
        }
        Promise.all(books)
            .then((booksResult) => {
                const booksPrice = booksResult
                    .map((x) => parseInt(x._price, 10));
                const totalValue = booksPrice.reduce((a, b) => a + b, 0);
                const result = { books: booksResult, totalValue: totalValue };
                return res.render('orders/partial/finishOrder.pug', result);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

const init = (data) => {
    return new OrdersCotroller(data);
};

module.exports = {
    init,
};