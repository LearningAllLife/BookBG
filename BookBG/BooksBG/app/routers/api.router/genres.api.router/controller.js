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
