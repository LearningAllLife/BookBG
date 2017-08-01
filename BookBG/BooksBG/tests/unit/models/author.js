/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last,no-unused-vars,no-trailing-spaces,max-len*/
const { expect } = require('chai');
const sinon = require('sinon');

describe('Author model tests', () => {
    const Author = require('../../../app/models/author-model');

    it('expect to create correctly', () => {
        const istance = new Author({ name: 'testAuthor', books: [1, 2, 3] });

        expect(istance.name).to.equal('testAuthor');
        expect(istance.books).to.deep.equal([1, 2, 3]);
    });

    it('expect to create correctly when there is no array in constructor', () => {
        const istance = new Author({ name: 'testAuthor' });

        expect(istance.name).to.equal('testAuthor');
        expect(istance.books).to.deep.equal([]);
    });
});