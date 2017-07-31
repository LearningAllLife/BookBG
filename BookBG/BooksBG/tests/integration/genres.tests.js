/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len*/
/* eslint-disable eol-last*/
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
describe('Integration Tests Genres Routes', () => {
    before(() => {
        return Promise.resolve()
            .then(() => {
                return MongoClient.connect(connectionString);
            })
            .then((db) => {
                const newId = new ObjectID('5974b7423fd5556b24d0eb7c');
                return db.collection('genres').insertOne({
                    '_id': newId,
                    '_name': 'Test Name Genre',
                    '_books': [],
                });
            });
    });
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
        it('Get allForDropDowns should return 200 and specific text', (done) => {
            request(url)
                .get('/genres/allForDropDown')
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Test Name Genre') < 0) {
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
        it('Get genres/add should return 302 and specific text', (done) => {
            request(url)
                .get('/genres/add')
                .expect(302)
                .expect(function(res) {
                    if (res.text.indexOf('Redirecting to /users/login') < 0) {
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
        it('Post genres/add should redirect to login ', (done) => {
            request(url)
                .post('/genres/add')
                .expect(302)
                .expect(function(res) {
                    if (res.text.indexOf('Redirecting to /users/login') < 0) {
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
                    const newId = new ObjectID('597c89853317857c20f2a9d4');
                    return db.collection('users').insertOne({
                        '_id': newId,
                        '_firstname': 'Genres123',
                        '_lastname': 'Genres321',
                        '_username': 'GenresUser',
                        '_password': '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
                        '_email': 'books.kamburov@abv.bg',
                        '_role': 'admin',
                        '_isDeleted': false,
                    });
                });
        });
        it('Get add returns 200 with right text  ', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'GenresUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .get('/genres/add')
                        .expect(200)
                        .expect(function(res) {
                            if (res.text.indexOf('Enter Genre') < 0) {
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
        it('Post add returns 302  when right genre is send  ', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'GenresUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .post('/genres/add')
                        .send({
                            'genre': 'abv',
                        })
                        .expect(302)
                        .expect(function(res) {
                            if (res.text.indexOf('Redirecting to /') < 0) {
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
        it('Post add returns 302 when empty genre is send and redirect to /genres/add ', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'GenresUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .post('/genres/add')
                        .send({
                            'genre': '',
                        })
                        .expect(302)
                        .expect(function(res) {
                            if (res.text.indexOf('Redirecting to /genres/add') < 0) {
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
        it('Post add returns 302 when already exist genre is send and redirect to /genres/add ', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'GenresUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .post('/genres/add')
                        .send({
                            'genre': 'Test Name Genre',
                        })
                        .expect(302)
                        .expect(function(res) {
                            if (res.text.indexOf('Redirecting to /genres/add') < 0) {
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
});