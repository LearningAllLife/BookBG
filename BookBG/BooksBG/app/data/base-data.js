const { ObjectID } = require('mongodb')

class BaseData {
    constructor(db, ModelClass) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
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

        if (filter == undefined) {
            filter = {};
        }

        const options = {};
        let result = this.collection
            .find(filter, options)
            .toArray()

        return result;
    }

    createInstanceOfClass(model) {
        let instance = require(`../models/${this.ModelClass.name.toLowerCase()}-model`);
        return new instance(model);
    }


    create(model) {
        return Promise.resolve().then(() => {
            let instance = this.createInstanceOfClass(model);

            return this.collection.insert(instance);
        })
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseData;