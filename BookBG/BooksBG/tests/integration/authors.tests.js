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
                const newId = new ObjectID('597dda98806cef0f002a15f5');
                return db.collection('authors').insertOne({
                    '_id': newId,
                    '_name': 'Test Name Author',
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
        it('Get althor by name should return 200 and author info', (done) => {
            request(url)
                .get('/authors/Test%20Name%20Author')
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Test Name Author') < 0) {
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
        it('Get authors/add should return 302 and specific text', (done) => {
            request(url)
                .get('/authors/add')
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
        it('Post authors/add should redirect to login ', (done) => {
            request(url)
                .post('/authors/add')
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
                    const newId = new ObjectID('597c89853307952c20f2a9d3');
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
                        .get('/authors/add')
                        .expect(200)
                        .expect(function(res) {
                            if (res.text.indexOf('Enter Author') < 0) {
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
        it('Post add returns 302  when right name is send  ', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'GenresUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .post('/authors/add')
                        .send({
                            'name': 'abv',
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
        it('Post add returns 302 when empty author name is send and redirect to /authors/add ', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'GenresUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .post('/authors/add')
                        .send({
                            'name': '',
                        })
                        .expect(302)
                        .expect(function(res) {
                            if (res.text.indexOf('Redirecting to /authors/add') < 0) {
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
        it('Post add returns 302 when already exist genre is send and redirect to /authors/add ', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'GenresUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .post('/authors/add')
                        .send({
                            'name': 'Test Name Author',
                        })
                        .expect(302)
                        .expect(function(res) {
                            if (res.text.indexOf('Redirecting to /authors/add') < 0) {
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
