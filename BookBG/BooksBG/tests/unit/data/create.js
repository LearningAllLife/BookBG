/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last,no-unused-vars*/
const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../app/data/base-data');

describe('Base data', () => {
    const db = {
        collection: () => {},
    };

    let items = [];
    let ModelClass = null;
    let data = null;

    beforeEach(() => {
        items = [1, 2, 3, 4];

        const toArray = () => {
            return Promise.resolve(items);
        };

        const insert = () => {

        };

        ModelClass = class {};

        sinon.stub(db, 'collection')
            .callsFake(() => {
                return { insert };
            });

        data = new BaseData(db, ModelClass);
    });

    it('expect to return all items', () => {
        return data.create()
            .then((result) => {

            });
    });
});