/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last,no-unused-vars*/
const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../app/data/base-data');

describe('Base data create()', () => {
    let db = null;
    let ModelClass = null;
    let data = null;
    const spy = null;
    const foundItems = [1, 2, 3];

    beforeEach(() => {
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

        const stub = sinon.stub(db, 'collection')
            .returns({ find, insert });

        data = new BaseData(db, ModelClass);
    });

    it('expect to insert into the collection the right model', () => {
        data.create(1)
            .then((result) => {
                expect(result).to.deep.equal(foundItems);
            });
    });
});