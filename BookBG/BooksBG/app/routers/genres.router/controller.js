const $ = require('../../../node_modules/jquery/dist/jquery.min.js');
const toastr = require('../../../node_modules/toastr/build/toastr.min.js');

class GenresConroller {
    constructor(data) {
        this.data = data;
    }

    create(req, res) {

        const genre = req.body;

        if (genre === undefined) {
            throw new Error("invalid genre");
        }

        this.data.genres.getAll({ _name: genre.name })
            .then((genres) => {
                if (genres.length === 0) {
                    return this.data.genres.create(genre);
                } else {
                    throw new Error("Already Exists");
                }
            })
    }

    getAllByFilter(req, res, filter) {
        var result = this.data.genres.getAll(filter);
        return result;
    }

}

const init = (data) => {
    return new GenresConroller(data);
};

module.exports = { init };