const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../app/data/base-data');

describe('Basedata.getAll()', () => {
    describe('with no filter, options,skip or limit with items', () => {

        const db = {
            collection: () => {}
        };
        
        let items = [];
        let ModelClass = null;
        let data = null;

        beforeEach(() => {
            let items = [1,2,3,4];

            const toArray = ()=>{
                return Promise.resolve(items);
            };

            const find = ()=>{
                return {
                    toArray,
                }
            }

             ModelClass = class {
                };

            sinon.stub(db,'collection')
                .callsFake(()=>{
                    return { find }
                });

            data = new BaseData(db, ModelClass);
        });

        it('expect to return all items', () => {
            let expected = [1,2,3,4];

            return data.getAll()
                .then((result) => {
                    expect(result).to.deep.equal(expected);
                });
        })
    })
});