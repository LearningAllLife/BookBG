/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last*/
// const $ = require('../../../node_modules/jquery/dist/jquery.min.js');
// const toastr = require('../../../node_modules/toastr/build/toastr.min.js');
class AuthorsControllerAPI {
    constructor(data) {
        this.data = data;
    }
    getAll(req, res) {
        return this.data.authors.getAll()
            .then((authors) => {
                return res.json(authors);
            });
    }
}
const init = (data) => {
    return new AuthorsControllerAPI(data);
};

module.exports = { init };