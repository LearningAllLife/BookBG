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
                } else {
                    throw new Error('Already Exists');
                }
            })
            .then(result => {
                return res.redirect('/');
            })
            .catch((err) => {
                // connect-flash
                // 
                req.flash('error', err.message);
                return res.redirect('/genres/add');
                // res.status('400');
                // res.send("Already got this genre");
            });
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