/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len,eol-last*/
const { ObjectID } = require('mongodb');

class BaseData {
    constructor(db, ModelClass) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }
    findOrCreateBy(props) {
        return this.getAll(props)
            .then(([model]) => {
                if (!model) {
                    model = {};
                    return this.collection.insert(model)
                        .then(() => {
                            return model;
                        });
                }
                return model;
            });
    }
    getById(id) {
        return Promise.resolve()
            .then(() => {
                return this.collection.findOne({ _id: new ObjectID(id) });
            })
            .then((model) => {
                if (!model) {
                    return null;
                }

                model.id = model._id;
                return model;
            });
    }

    getAll(filter, options, skip, limit) {
        if (typeof filter === 'undefined') {
            filter = {};
        }
        if (typeof options === 'undefined') {
            options = {};
        }
        if (typeof skip === 'undefined') {
            skip = 0;
        }
        if (typeof limit === 'undefined') {
            limit = 0;
        }

        return this.collection
            .find(filter, options, skip, limit)
            .toArray();
    }

    createInstanceOfClass(model) {
        const Instance = require(`../models/${this.ModelClass.name.toLowerCase()}-model`);
        return new Instance(model);
    }
    create(model) {
        return Promise.resolve()
            .then(() => {
                let instance;
                try {
                    instance = this.createInstanceOfClass(model);
                } catch (err) {
                    throw Error(err.message);
                }
                // console.log(instance);
                return this.collection.insert(instance);
            });
    }

    update(model, updateModel) {
        return this.collection
            .updateOne(model, updateModel)
            .then((res) => {
                return res;
            });
    }
    count(filter) {
        if (typeof filter === 'undefined') {
            filter = { _isDeleted: false };
        } else if (typeof filter !== 'undefined') {
            filter._isDeleted = false;
        }
        return this.collection
            .count(filter)
            .then((res) => {
                return res;
            });
    }
    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseData;