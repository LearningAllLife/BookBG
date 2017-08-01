/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last,no-unused-vars*/
const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../app/data/base-data');

describe('Base data getById()', () => {
    let db = null;
    let ModelClass = null;
    let data = null;
    const spy = null;
    const foundItems = [1, 2, 3];

    it('expect to return null if there is no object found', () => {
        ModelClass = { name: 'testclass' };

        db = {
            collection: () => {},
        };

        const insert = (model) => {
            return Promise.resolve(model);
        };

        const toArray = () => {
            return foundItems;
        };

        const find = (props) => {
            return {
                toArray,
            };
        };

        const findOne = (props) => {
            return Promise.resolve(null);
        };

        const stub = sinon.stub(db, 'collection')
            .returns({ find, insert, findOne });

        data = new BaseData(db, ModelClass);

        data.getById(1)
            .then((result) => {
                expect(result).to.deep.equal(null);
            });
    });

    it('expect to return correct object with property', () => {
        ModelClass = { name: 'testclass' };

        db = {
            collection: () => {},
        };

        const insert = (model) => {
            return Promise.resolve(model);
        };

        const toArray = () => {
            return foundItems;
        };

        const find = (props) => {
            return {
                toArray,
            };
        };

        const findOne = (props) => {
            return Promise.resolve({ _id: 13 });
        };

        const stub = sinon.stub(db, 'collection')
            .returns({ find, insert, findOne });

        data = new BaseData(db, ModelClass);

        data.getById(1)
            .then((result) => {
                expect(result._id).to.deep.equal(13);
            });
    });
});