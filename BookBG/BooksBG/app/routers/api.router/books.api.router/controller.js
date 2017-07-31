/* eslint linebreak-style: ["error", "windows"]*/
// const $ = require('../../../node_modules/jquery/dist/jquery.min.js');
// const toastr = require('../../../node_modules/toastr/build/toastr.min.js');
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