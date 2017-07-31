/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len*/
const request = require('supertest');
const url = 'http://localhost:3002';
const connectionString = 'mongodb://localhost/books-db-test';
const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
let token;

describe('Integration Tests Orders API Routes', () => {
    after(() => {
        return Promise.resolve()
            .then(() => {
                return MongoClient.connect(connectionString);
            })
            .then((db) => {
                return db.dropDatabase();
            });
    });
    describe('Not registered User and orders', () => {
        before(() => {
            return Promise.resolve()
                .then(() => {
                    return MongoClient.connect(connectionString);
                })
                .then((db) => {
                    const userId = new ObjectID('544c91443ecc2d3290e3e0a0');
                    db.collection('users').insertOne({
                        '_id': userId,
                        '_firstname': 'Book123',
                        '_lastname': 'Book123',
                        '_username': 'OrdersApiUser',
                        '_password': '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
                        '_email': 'books.kamburov@abv.bg',
                        '_role': 'admin',
                        '_isDeleted': false,
                    });
                    return db;
                })
                .then((db) => {
                    const orderNewId = new ObjectID('545e03149068362357b06d58');
                    const bookNewId = new ObjectID('596b3aadc36e47278057ee1c');
                    const userNewId = new ObjectID('544c91443ecc2d3290e3e0a0');
                    return db.collection('orders').insertOne({
                        '_id': orderNewId,
                        '_books': [{
                            '_id': bookNewId,
                            '_title': 'Gone with the Wind4',
                            '_author': 'Margareth4',
                            '_genre': 'Romans',
                            '_rating': '10',
                            '_price': '54',
                            '_picture': 'https://assets.chitanka.info/thumb/book-cover/0e/3748.max.jpg',
                            '_isDeleted': false,
                            'id': bookNewId,
                        }],
                        '_adress': 'df',
                        '_user': {
                            '_id': userNewId,
                            '_firstname': 'Book123',
                            '_lastname': 'Book123',
                            '_username': 'OrdersApiUser',
                            '_password': '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
                            '_email': 'books.kamburov@abv.bg',
                            '_role': 'admin',
                            '_isDeleted': false,
                            'id': userNewId,
                        },
                        '_phoneNumber': '123456',
                        '_totalPrice': 54,
                        '_isDone': false,

                    });
                });
        });
        it('authenticate', (done) => {
            request(url)
                .post('/api/users/auth')
                .send({
                    'username': 'OrdersApiUser',
                    'password': '123456',
                })
                .expect((res) => {
                    token = res.body.token;
                })
                .end(function(error, response) {
                    if (error) {
                        throw error;
                    }
                    done();
                });
        });
        it('Get all orders should return orders as json', (done) => {
            request(url)
                .get('/api/orders/')
                .set('x-username', 'OrdersApiUser')
                .set('x-token', token)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(function(res) {
                    if (res.body[0]._books[0]._title !== 'Gone with the Wind4' ||
                        res.body[0]._books[0]._genre !== 'Romans' ||
                        res.body[0]._books[0]._author !== 'Margareth4') {
                        throw Error('not right contain');
                    }
                })
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Get all orders should return orders as Unathorized if wrong username', (done) => {
            request(url)
                .get('/api/orders/')
                .set('x-username', 'OrdersApiUser2')
                .set('x-token', token)
                .set('Accept', 'application/json')
                .expect(401)
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Get all orders should return orders as Unathorized if wrong token', (done) => {
            request(url)
                .get('/api/orders/')
                .set('x-username', 'OrdersApiUser2')
                .set('x-token', token + 'sdfdsf')
                .set('Accept', 'application/json')
                .expect(401)
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
    });
});