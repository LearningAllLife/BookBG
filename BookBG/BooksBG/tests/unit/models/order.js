/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last,no-unused-vars,no-trailing-spaces,max-len*/
const { expect } = require('chai');
const sinon = require('sinon');

describe('Order model tests', () => {
    const Order = require('../../../app/models/order-model');

    it('expect to create correctly', () => {
        const instance = new Order({
            books: [1, 2, 3],
            adress: 'testAdress',
            user: 'testUser',
            phoneNumber: '123456',
        });

        expect(instance.books).to.deep.equal([1, 2, 3]);
        expect(instance.adress).to.equal('testAdress');
        expect(instance.user).to.equal('testUser');
        expect(instance.phoneNumber).to.equal('123456');
    });

    // it('expect to throw error when phoneNumber is undefined', () => {
    //     const instance = new Order({
    //         books: [1, 2, 3],
    //         adress: 'testAdress',
    //         user: 'testUser',
    //     });

    //     expect(instance.phoneNumber).to.throw(new Error('Invalid phone Number'));
    // });
});