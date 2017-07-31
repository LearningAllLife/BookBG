/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len,eol-last*/
const BaseData = require('./base-data');
const Genre = require('../models/author-model');

class AuthorsData extends BaseData {
    constructor(db) {
        super(db, Genre);
    }

    findOrCreateBy(props) {
        return this.getAll({ _name: props.name })
            .then(([model]) => {
                if (!model) {
                    const name = props.name;
                    const content = props.content;
                    const books = [];
                    books.push(content);

                    return this.create({ name, books });
                }

                const oldModel = model;

                this.update({ _name: oldModel._name }, { $push: { _books: props.content } });

                return model;
            });
    }
}

module.exports = AuthorsData;