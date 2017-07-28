class GenresConroller {
    constructor(data) {
        this.data = data;
    }

    create(req, res) {
        const genre = req.body;

        if (typeof genre === 'undefined') {
            throw new Error('Invalid genre');
        }

        this.data.genres.getAll({ _name: genre.genre })
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
    getGenresForDropDown(req, res) {
        const filter = {};
        return this.data.genres.getAll(filter)
            .then((genres) => {
                res.render('genres/partialViews/forDropDown.pug', { data: genres });
            });
    }

}

const init = (data) => {
    return new GenresConroller(data);
};

module.exports = { init };