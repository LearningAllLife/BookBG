/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len*/
const request = require('supertest');
const url = 'http://localhost:3002';
const connectionString = 'mongodb://localhost/books-db-test';
const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');

function createAuthenticatedRequest(server, loginDetails, callback) {
    const authenticatedRequest = request.agent(url);
    authenticatedRequest
        .post(server)
        .send(loginDetails)
        .end(function(error, response) {
            if (error) {
                throw error;
            }
            callback(authenticatedRequest);
        });
}
describe('Integration Tests Orders Routes', () => {
    after(() => {
        return Promise.resolve()
            .then(() => {
                return MongoClient.connect(connectionString);
            })
            .then((db) => {
                return db.dropDatabase();
            });
    });
    describe('Not registered User', () => {
        it('Get all gets 302 and redirect to login ', (done) => {
            request(url)
                .get('/orders/all')
                .expect(302)
                .expect(function(res) {
                    if (res.text.indexOf('Redirecting') < 0) {
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
        it('Post form gets 302 and redirect to login ', (done) => {
            request(url)
                .post('/orders/form')
                .send({
                    'ids': '123412',
                })
                .expect(302)
                .expect(function(res) {
                    if (res.text.indexOf('Redirecting') < 0) {
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
        it('Post order gets 302 and redirect to login ', (done) => {
            request(url)
                .post('/orders/createOrder')
                .send({
                    'ids': '123412',
                })
                .expect(302)
                .expect(function(res) {
                    if (res.text.indexOf('Redirecting') < 0) {
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
        it('Post checkout gets 302 and redirect to login ', (done) => {
            request(url)
                .post('/orders/checkout')
                .send({
                    'adress': 'df',
                    'books': '596b6aadc36e58168057ee1c',
                    'phoneNumber': 'sdf',
                    'userId': '597aead3a0bdd119d0570e63',
                })
                .expect(302)
                .expect(function(res) {
                    if (res.text.indexOf('Redirecting') < 0) {
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
        it('Success gets 302 and redirect to login ', (done) => {
            request(url)
                .get('/orders/success')
                .expect(302)
                .expect(function(res) {
                    if (res.text.indexOf('Redirecting') < 0) {
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
        it('Complete order gets 302 and redirect to login ', (done) => {
            request(url)
                .put('/orders/complete')
                .send({
                    'id': 'orderid',
                })
                .expect(302)
                .expect(function(res) {
                    if (res.text.indexOf('Redirecting') < 0) {
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
    });
    describe('Registered User', () => {
        before(() => {
            return Promise.resolve()
                .then(() => {
                    return MongoClient.connect(connectionString);
                })
                .then((db) => {
                    const newId = new ObjectID('596b6aadc36e57178057ee1c');
                    db.collection('books').insertOne({
                        '_id': newId,
                        '_title': 'Gone with the Wind2',
                        '_author': 'Margareth',
                        '_genre': 'Romans',
                        '_rating': '10',
                        '_price': '54',
                        '_picture': 'https://assets.chitanka.info/thumb/book-cover/0e/3748.max.jpg',
                        '_isDeleted': false,
                    });
                    return db;
                })
                .then((db) => {
                    const newId = new ObjectID('596b6aadc36e57178057ee1c');
                    db.collection('genres').insertOne({
                        '_name': 'Romans',
                        '_books': [{
                            '_id': newId,
                            '_title': 'Gone with the Wind2',
                            '_author': 'Margareth',
                            '_genre': 'Romans',
                            '_rating': '10',
                            '_price': '54',
                            '_picture': 'https://assets.chitanka.info/thumb/book-cover/0e/3748.max.jpg',
                            '_isDeleted': false,
                        }],
                    });
                    return db;
                })
                .then((db) => {
                    const newId = new ObjectID('596b6aadc36e57178057ee1c');
                    db.collection('authors').insertOne({
                        '_name': 'Margareth',
                        '_books': [{
                            '_id': newId,
                            '_title': 'Gone with the Wind2',
                            '_author': 'Margareth',
                            '_genre': 'Romans',
                            '_rating': '10',
                            '_price': '54',
                            '_picture': 'https://assets.chitanka.info/thumb/book-cover/0e/3748.max.jpg',
                            '_isDeleted': false,
                        }],
                    });
                    return db;
                })
                .then((db) => {
                    const newId = new ObjectID('597c89843297952c20f2a9d3');
                    return db.collection('users').insertOne({
                        '_id': newId,
                        '_firstname': 'Order123',
                        '_lastname': 'Order123',
                        '_username': 'OdersUser',
                        '_password': '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
                        '_email': 'books.kamburov@abv.bg',
                        '_role': 'user',
                        '_isDeleted': false,
                    });
                });
        });
        it('Get success returns 200 with right text  ', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'OdersUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .get('/orders/success')
                        .expect(200)
                        .expect(function(res) {
                            if (res.text.indexOf('successfull') < 0) {
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
        });
        it('Post form 200 ok', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'OdersUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .post('/orders/form')
                        .send({
                            'ids': '596b6aadc36e57178057ee1c',
                        })
                        .expect(200)
                        .expect(function(res) {
                            if (res.text.indexOf('Gone with the Wind2') < 0) {
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
        });
        it('Post order gets 200 and open cofirm order ', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'OdersUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .post('/orders/createOrder')
                        .send({
                            'ids': '596b6aadc36e57178057ee1c',
                        })
                        .expect(200)
                        .expect(function(res) {
                            if (res.text.indexOf('Gone with the Wind2') < 0) {
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
        });
        it('Post checkout gets 302 and redirect to success ', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'OdersUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .post('/orders/checkout')
                        .send({
                            'adress': 'df',
                            'books': '596b6aadc36e57178057ee1c',
                            'phoneNumber': '123456',
                            'userId': '597c89843297952c20f2a9d3',
                        })
                        .expect(302)
                        .expect(function(res) {
                            if (res.text.indexOf('Redirecting to /orders/success') < 0) {
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
        });
    });
    describe('Admin User', () => {
        before(() => {
            return Promise.resolve()
                .then(() => {
                    return MongoClient.connect(connectionString);
                })
                .then((db) => {
                    db.collection('users').update({ _username: 'OdersUser' }, {
                        $set: {
                            _role: 'admin',
                        },
                    });
                    return db;
                })
                .then((db) => {
                    const orderNewId = new ObjectID('597e03149068362358b06d52');
                    const bookNewId = new ObjectID('596b6aadc36e57178057ee1c');
                    const userNewId = new ObjectID('597c89843297952c20f2a9d3');
                    return db.collection('orders').insertOne({
                        '_id': orderNewId,
                        '_books': [{
                            '_id': bookNewId,
                            '_title': 'Gone with the Wind2',
                            '_author': 'Margareth',
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
                            '_firstname': 'Order123',
                            '_lastname': 'Order123',
                            '_username': 'OdersUser',
                            '_password': '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
                            '_email': 'books.kamburov@abv.bg',
                            '_role': 'user',
                            '_isDeleted': false,
                            'id': userNewId,
                        },
                        '_phoneNumber': '123456',
                        '_totalPrice': 54,
                        '_isDone': false,

                    });
                });
        });
        it('Get all orders as admin returns orders ', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'OdersUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .get('/orders/all')
                        .expect(200)
                        .expect(function(res) {
                            if (res.text.indexOf('Gone with the Wind2') < 0) {
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
        });
        it('Complete order  ', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'OdersUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .put('/orders/complete')
                        .send({
                            'id': '597e03149068362358b06d52',
                        })
                        .expect(200)
                        .end((error, response) => {
                            if (error) {
                                console.log(error);
                            }
                            done();
                        });
                });
        });
    });
});
