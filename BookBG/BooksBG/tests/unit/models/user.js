/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last,no-unused-vars,no-trailing-spaces,max-len*/
const { expect } = require('chai');
const sinon = require('sinon');

describe('User model tests', () => {
    const User = require('../../../app/models/user-model');

    it('expect to create correctly', () => {
        const instance = new User({
            firstname: 'firstTest',
            lastname: 'lastTest',
            username: 'userTest',
            password: 'asd123',
            email: 'test@gmail.com',
            role: 'user',
        });

        expect(instance.firstname).to.equal('firstTest');
        expect(instance.lastname).to.equal('lastTest');
        expect(instance.username).to.equal('userTest');
        expect(instance.password).to.equal('asd123');
        expect(instance.email).to.equal('test@gmail.com');
        expect(instance.role).to.equal('user');
    });
});