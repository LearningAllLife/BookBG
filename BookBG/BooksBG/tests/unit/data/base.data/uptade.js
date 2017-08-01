/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len,eol-last*/
const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../app/data/base-data');

describe('Base data update()', () => {
    let db = null;
    let ModelClass = null;
    let data = null;
    const foundItems = [1, 2, 3];
    let stub = null;

    beforeEach(() => {
        ModelClass = { name: 'testclass' };

        db = {
            collection: () => {},
        };

        const insert = (model) => {
            return Promise.resolve(model);
        };

        const toArray = () => {
            return Promise.resolve(foundItems);
        };

        const updateOne = (filter, value) => {
            return Promise.resolve(filter, value);
        };
        const find = (props) => {
            return {
                toArray,
            };
        };

        stub = sinon.stub(db, 'collection')
            .returns({ find, insert, updateOne });

        data = new BaseData(db, ModelClass);
    });

    it('expect to update correctly', () => {
        data.update(1, 2)
            .then((result) => {
                expect(result).to.deep.equal(1);
            });
    });
});