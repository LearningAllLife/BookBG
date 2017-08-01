/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last,no-unused-vars,no-trailing-spaces,max-len*/
const { expect } = require('chai');
const sinon = require('sinon');

describe('Book model tests', () => {
    const Book = require('../../../app/models/book-model');

    it('expect to create correctly', () => {
        const instance = new Book({
            title: 'testTitle',
            author: 'testAuthor',
            genre: 'testGenre',
            price: '2',
            picture: 'testPicture',
        });

        expect(instance.title).to.equal('testTitle');
        expect(instance.author).to.equal('testAuthor');
        expect(instance.genre).to.equal('testGenre');
        expect(instance.price).to.equal('2');
        expect(instance.picture).to.equal('testPicture');
    });
});