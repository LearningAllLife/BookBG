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
