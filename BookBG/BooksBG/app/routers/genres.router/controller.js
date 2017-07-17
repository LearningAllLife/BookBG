const $ = require('../../../node_modules/jquery/dist/jquery.min.js');
const toastr = require('../../../node_modules/toastr/build/toastr.min.js');

class GenresConroller {
    constructor(data) {
        this.data = data;
    }

    // create(req, res) {

    //     const book = req.body;

    //     if (book === undefined) {
    //         throw new Error("invalid book");
    //     }

    //     return this.data.books.create(book);

    // }

    getAllByFilter(req, res, filter) {
        var result = this.data.genres.getAll(filter);
        return result;
    }

}

const init = (data) => {
    return new GenresConroller(data);
};

module.exports = { init };