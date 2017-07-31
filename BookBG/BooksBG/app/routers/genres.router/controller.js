/* eslint linebreak-style: ["error", "windows"]*/
// const $ = require('../../../node_modules/jquery/dist/jquery.min.js');
// const toastr = require('../../../node_modules/toastr/build/toastr.min.js');
class GenresConroller {
    constructor(data) {
        this.data = data;
    }

    create(req, res) {
        const genre = req.body;
        return Promise.resolve()
            .then(() => {
                if (typeof genre === 'undefined' || !genre.genre) {
                    throw new Error('Invalid genre');
                }

                return this.data.genres.getAll({ _name: genre.genre });
            })
            .then((genres) => {
                if (genres.length === 0) {
                    return this.data.genres.create({ name: genre.genre });
                }
                throw new Error('Already Exists');
            })
            .then((result) => {
                return res.redirect('/');
            })
            .catch((err) => {
                req.flash('error', err.message);
                return res.redirect('/genres/add');
            });
    }
    getAddForm(req, res) {
        return res.render('genres/addGenreForm');
    }

    getGenresForDropDown(req, res) {
        const filter = {};
        return this.data.genres.getAll(filter)
            .then((genres) => {
                res.render('genres/partialViews/forDropDown.pug', {
                    data: genres,
                });
            });
    }
}

const init = (data) => {
    return new GenresConroller(data);
};

module.exports = { init };
