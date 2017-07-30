class BooksControllerAPI {
    constructor(data) {
        this.data = data;
    }
    getAll(req, res) {
        return this.data.books.getAll()
            .then((books) => {
                return res.json(books);
            });
    }
}
const init = (data) => {
    return new BooksControllerAPI(data);
};

module.exports = { init };
