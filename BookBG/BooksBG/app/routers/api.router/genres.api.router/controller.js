/* eslint linebreak-style: ["error", "windows"]*/
// const $ = require('../../../node_modules/jquery/dist/jquery.min.js');
// const toastr = require('../../../node_modules/toastr/build/toastr.min.js');
class GenresControllerAPI {
    constructor(data) {
        this.data = data;
    }
    getAll(req, res) {
        return this.data.genres.getAll()
            .then((genres) => {
                return res.json(genres);
            });
    }
}
const init = (data) => {
    return new GenresControllerAPI(data);
};

module.exports = { init };