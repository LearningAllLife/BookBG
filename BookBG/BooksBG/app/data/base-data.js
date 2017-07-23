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
        return this.collection.findOne({ _id: new ObjectID(id) })
            .then((model) => {
                if (!model) {
                    return null;
                }

                model.id = model._id;
                return model;
            });
    }

    getAll(filter) {
        if (typeof filter === 'undefined') {
            filter = {};
        }
        const options = {};
        const result = this.collection
            .find(filter, options)
            .toArray();

        return result;
    }

    createInstanceOfClass(model) {
        const Instance = require(`../models/${this.ModelClass.name.toLowerCase()}-model`);
        return new Instance(model);
    }
    create(model) {
        return Promise.resolve()
            .then(() => {
                const instance = this.createInstanceOfClass(model);

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
    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseData;