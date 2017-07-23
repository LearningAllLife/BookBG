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
    createOrder(req, res) {
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
                const result = { books: booksResult, totalValue: totalValue, user: req.user, booksIds: ids };
                return res.render('orders/partial/checkOut.pug', result);
            })
            .catch((err) => {
                req.flash('error', err.message);
                res.redirect(req.get('referer'));
            });
    }
    create(req, res) {
        //  books, adress, user, phoneNumber 
        const order = req.body;
        const ids = order.books.split(',');
        if (typeof order === 'undefined') {
            throw new Error('Invalid order');
        }
        let books = [];
        for (const id of ids) {
            books.push(this.data.books.getById(id));
        }
        Promise.all(books)
            .then((booksResult) => {
                books = booksResult;
                return this.data.users.getById(order.userId);
            })
            .then((user) => {
                return this.data.orders.create({
                        books: books,
                        adress: order.adress,
                        user: user,
                        phoneNumber: order.phoneNumber,
                    })
                    .then(() =>
                        res.redirect('/orders/success')
                    )
                    .catch((err) => {
                        // connect-flash
                        req.flash('error', err.message);
                        res.redirect(req.get('referer'));
                    });
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
                req.flash('error', err.message);
                res.redirect(req.get('referer'));
            });
    }
    success(req, res) {
        res.render('orders/success.pug');
    }
}

const init = (data) => {
    return new OrdersCotroller(data);
};

module.exports = {
    init,
};