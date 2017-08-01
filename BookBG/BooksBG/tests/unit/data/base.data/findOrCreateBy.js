/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last,no-unused-vars*/
const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../app/data/base-data');

describe('Base data getById()', () => {
    // let db = null;
    // let ModelClass = null;
    // let data = null;
    const spy = null;
    const foundItems = [1, 2, 3];

    it('expect to insert if model is not yet existent', () => {
        // ModelClass = { name: 'testclass' };

        // db = {
        //     collection: () => {},
        //     getAll: () => {
        //         return Promise.resolve(null);
        //     },
        // };

        // const insert = (model) => {
        //     return Promise.resolve(model);
        // };

        // const toArray = () => {
        //     return foundItems;
        // };

        // const find = (props) => {
        //     return {
        //         toArray,
        //     };
        // };

        // const findOne = (props) => {
        //     return Promise.resolve(null);
        // };

        // const stub = sinon.stub(db, 'collection')
        //     .returns({ find, insert, findOne });

        // data = new BaseData(db, ModelClass);

        // data.findOrCreateBy(1)
        //     .then((result) => {});
    });
});