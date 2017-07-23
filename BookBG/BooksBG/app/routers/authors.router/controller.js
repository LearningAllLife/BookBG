class AuthorsController {
    constructor(data) {
        this.data = data;
    }

    create(req, res) {
        const authorBody = req.body;
        if (typeof authorBody === 'undefined') {
            throw new Error('Invalid author');
        }

        this.data.authors.getAll({ _name: authorBody.name })
            .then((author) => {
                if (author.length === 0) {
                    return this.data.authors.create({ name: authorBody.name });
                }

                throw new Error('Already Exists');
            })
            .then((result) => {
                return res.redirect('/');
            })
            .catch((err) => {
                req.flash('error', err.message);
                res.redirect(req.get('referer'));
            });
    }
    renderCreateForm(req, res) {
        return res.render('authors/addAuthorForm');
    }
    getByName(req, res) {
        const name = req.params.name;
        if (!name) {
            throw Error('No such author');
        }

        return this.data.authors.getAll({ _name: name })
            .then((authors) => {
                if (authors.length === 0) {
                    throw Error('No such author');
                }
                const author = authors[0];
                res.render('authors/info.pug', { author: author });
            }).catch((err) => {
                req.flash('error', err.message);
                res.redirect(req.get('referer'));
            });
    }
}
const init = (data) => {
    return new AuthorsController(data);
};

module.exports = { init };