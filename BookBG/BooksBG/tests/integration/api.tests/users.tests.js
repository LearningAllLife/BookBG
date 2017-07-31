const request = require('supertest');
const url = 'http://localhost:3002';
const connectionString = 'mongodb://localhost/books-db-test';
const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
let tokenNotAdmin;
let tokenAdmin;

describe('Integration Tests Users API Routes', () => {
    after(() => {
        return Promise.resolve()
            .then(() => {
                return MongoClient.connect(connectionString);
            })
            .then((db) => {
                return db.dropDatabase();
            });
    });
    before(() => {
        return Promise.resolve()
            .then(() => {
                return MongoClient.connect(connectionString);
            })
            .then((db) => {
                const newId = new ObjectID('556b6aadc35e67968058ee1c');
                db.collection('users').insertOne({
                    '_id': newId,
                    '_firstname': 'user',
                    '_lastname': 'user',
                    '_username': 'UsersTestUser',
                    '_password': '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
                    '_email': 'books.kamburov@abv.bg',
                    '_role': 'admin',
                    '_isDeleted': false,
                });
                return db;
            })
            .then((db) => {
                const newId = new ObjectID('566b6aadc66e67668066ee1c');
                return db.collection('users').insertOne({
                    '_id': newId,
                    '_firstname': 'user',
                    '_lastname': 'user',
                    '_username': 'UsersTestUserNotAdmin',
                    '_password': '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
                    '_email': 'books.kamburov@abv.bg',
                    '_role': 'user',
                    '_isDeleted': false,
                });
            });
    });
    describe('Not registered User', () => {
        it('Create admin should return 401 if no token and user', (done) => {
            request(url)
                .put('/api/users/makeAdmin')
                .expect(401)
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Authenticate should return token if right username and password', (done) => {
            request(url)
                .post('/api/users/auth')
                .send({
                    'username': 'UsersTestUserNotAdmin',
                    'password': '123456',
                })
                .expect((res) => {
                    if (!res.body.token || !res.body.success) {
                        throw Error('No token');
                    }
                    tokenNotAdmin = res.body.token;
                })
                .end(function(error, response) {
                    if (error) {
                        throw error;
                    }
                    done();
                });
        });
        it('Authenticate should return Unathorize if wrong username ', (done) => {
            request(url)
                .post('/api/users/auth')
                .send({
                    'username': 'UsersTestUser1',
                    'password': '123456',
                })
                .expect(401)
                .end(function(error, response) {
                    if (error) {
                        throw error;
                    }
                    done();
                });
        });
        it('Authenticate should return Unathorize if wrong password ', (done) => {
            request(url)
                .post('/api/users/auth')
                .send({
                    'username': 'UsersTestUserNotAdmin',
                    'password': '1234561',
                })
                .expect(401)
                .end(function(error, response) {
                    if (error) {
                        throw error;
                    }
                    done();
                });
        });
        it('Get all should return 200 if not admin with message', (done) => {
            request(url)
                .get('/api/users/')
                .set('x-username', 'UsersTestUserNotAdmin')
                .set('x-token', tokenNotAdmin)
                .set('Accept', 'application/json')
                .expect(200)
                .expect((res) => {
                    if (res.body !== 'You must be admin') {
                        throw Error('Wrong content of message');
                    }
                })
                .end(function(error, response) {
                    if (error) {
                        throw error;
                    }
                    done();
                });
        });
        it('Get all should return 401 if not loged ', (done) => {
            request(url)
                .get('/api/users/')
                .expect(401)
                .end(function(error, response) {
                    if (error) {
                        throw error;
                    }
                    done();
                });
        });
    });
    describe('Registered User and books', () => {
        it('authenticate', (done) => {
            request(url)
                .post('/api/users/auth')
                .send({
                    'username': 'UsersTestUser',
                    'password': '123456',
                })
                .expect((res) => {
                    tokenAdmin = res.body.token;
                })
                .end(function(error, response) {
                    if (error) {
                        throw error;
                    }
                    done();
                });
        });
        it('Get all should return 200 with all users if admin is loged in', (done) => {
            request(url)
                .get('/api/users/')
                .set('x-username', 'UsersTestUser')
                .set('x-token', tokenAdmin)
                .set('Accept', 'application/json')
                .expect(200)
                .expect((res) => {
                    if (res.body.users[0]._username !== 'UsersTestUser' ||
                        res.body.users[1]._username !== 'UsersTestUserNotAdmin') {
                        throw Error('Wrong content');
                    }
                })
                .end(function(error, response) {
                    if (error) {
                        throw error;
                    }
                    done();
                });
        });
        it('Put on make admin with right secret word returns success', (done) => {
            request(url)
                .put('/api/users/makeadmin')
                .send({
                    'username': 'UsersTestUserNotAdmin',
                    'secretmessage': 'Poweroverwhelming',
                })
                .set('x-username', 'UsersTestUser')
                .set('x-token', tokenAdmin)
                .set('Accept', 'application/json')
                .expect(200)
                .expect((res) => {
                    if (res.body.message !== 'success') {
                        throw Error('Wrong content');
                    }
                })
                .end(function(error, response) {
                    if (error) {
                        throw error;
                    }
                    done();
                });
        });
        it('Put on make admin with wrong secret word returns 400', (done) => {
            request(url)
                .put('/api/users/makeadmin')
                .send({
                    'username': 'UsersTestUserNotAdmin',
                    'secretmessage': 'Poweroverwhelmingdfdfdf',
                })
                .set('x-username', 'UsersTestUser')
                .set('x-token', tokenAdmin)
                .set('Accept', 'application/json')
                .expect(400)
                .expect((res) => {
                    if (res.body.message !== 'Wrong secret message') {
                        throw Error('Wrong content');
                    }
                })
                .end(function(error, response) {
                    if (error) {
                        throw error;
                    }
                    done();
                });
        });
        it('Put on make admin with wrong username returns 400', (done) => {
            request(url)
                .put('/api/users/makeadmin')
                .send({
                    'username': 'UsersTestUserNotAdmindfdf',
                    'secretmessage': 'Poweroverwhelming',
                })
                .set('x-username', 'UsersTestUser')
                .set('x-token', tokenAdmin)
                .set('Accept', 'application/json')
                .expect(400)
                .expect((res) => {
                    if (res.body.message !== 'No such user') {
                        throw Error('Wrong content');
                    }
                })
                .end(function(error, response) {
                    if (error) {
                        throw error;
                    }
                    done();
                });
        });
        it('Put on make admin with no username and no secret word returns 400', (done) => {
            request(url)
                .put('/api/users/makeadmin')
                .send({
                    'username': '',
                    'secretmessage': '',
                })
                .set('x-username', 'UsersTestUser')
                .set('x-token', tokenAdmin)
                .set('Accept', 'application/json')
                .expect(400)
                .expect((res) => {
                    if (res.body.message !== 'You must provide secretmessage and username') {
                        throw Error('Wrong content');
                    }
                })
                .end(function(error, response) {
                    if (error) {
                        throw error;
                    }
                    done();
                });
        });
    });
});