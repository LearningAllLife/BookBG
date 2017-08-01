/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last,no-unused-vars,no-trailing-spaces,max-len*/
const { expect } = require('chai');
const sinon = require('sinon');

describe('Genre model tests', () => {
    const Genre = require('../../../app/models/genre-model');

    it('expect to create correctly', () => {
        const instance = new Genre({ name: 'testName', books: [1, 2, 3] });

        expect(instance.name).to.equal('testName');
        expect(instance.books).to.deep.equal([1, 2, 3]);
    });

    it('expect to create correctly when there is no array in constructor', () => {
        const instance = new Genre({ name: 'testName' });

        expect(instance.name).to.equal('testName');
        expect(instance.books).to.deep.equal([]);
    });
});