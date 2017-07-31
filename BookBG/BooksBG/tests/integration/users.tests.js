/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len*/
const request = require('supertest');
const url = 'http://localhost:3002';
const connectionString = 'mongodb://localhost/books-db-test';
const { MongoClient } = require('mongodb');

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


describe('Integration Tests users Routes', () => {
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
        it('All Users route to return redirect to login if not loged in',
            (done) => {
                request(url)
                    .get('/users/')
                    .expect(302)
                    .expect('Location', '/users/login')
                    .end((error, response) => {
                        if (error) {
                            console.log(error);
                        }
                        done();
                    });
            });
        it('Login page to return status 200', (done) => {
            request(url)
                .get('/users/login')
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Register page to return status 200', (done) => {
            request(url)
                .get('/users/register')
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Chat page to return status 302 when not logged in', (done) => {
            request(url)
                .get('/users/chat')
                .expect(302)
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Register user with invalid firstname should throw error response',
            (done) => {
                request(url)
                    .post('/users/register')
                    .type('form')
                    .send({
                        firstname: 'F',
                        lastname: 'LastName',
                        username: 'UserName',
                        password: '123456',
                        email: 'user@test.com',
                    })
                    .expect('Location', 'undefined')
                    .expect(302)
                    .end((error, response) => {
                        if (error) {
                            console.log(error);
                        }
                        done();
                    });
            });
        it('Register user with invalid lastname should throw error response',
            (done) => {
                request(url)
                    .post('/users/register')
                    .type('form')
                    .send({
                        firstname: 'FirstName',
                        lastname: 'l',
                        username: 'UserName',
                        password: '123456',
                        email: 'user@test.com',
                    })
                    .expect(302)
                    .expect('Location', 'undefined')
                    .end((error, response) => {
                        if (error) {
                            console.log(error);
                        }
                        done();
                    });
            });
        it('Register user with invalid username should throw error response',
            (done) => {
                request(url)
                    .post('/users/register')
                    .type('form')
                    .send({
                        firstname: 'FirstName',
                        lastname: 'LastName',
                        username: 'U',
                        password: '123456',
                        email: 'user@test.com',
                    })
                    .expect(302)
                    .expect('Location', 'undefined')
                    .end((error, response) => {
                        if (error) {
                            console.log(error);
                        }
                        done();
                    });
            });
        it('Register user with invalid Password should throw error response',
            (done) => {
                request(url)
                    .post('/users/register')
                    .type('form')
                    .send({
                        firstname: 'FirstName',
                        lastname: 'LastName',
                        username: 'UserName',
                        password: '1',
                        email: 'user@test.com',
                    })
                    .expect(302)
                    .expect('Location', 'undefined')
                    .end((error, response) => {
                        if (error) {
                            console.log(error);
                        }
                        done();
                    });
            });
        it('Register user with invalid email should throw error response',
            (done) => {
                request(url)
                    .post('/users/register')
                    .type('form')
                    .send({
                        firstname: 'FirstName',
                        lastname: 'LastName',
                        username: 'UserName',
                        password: '11241234',
                        email: 'u',
                    })
                    .expect(302)
                    .expect('Location', 'undefined')
                    .end((error, response) => {
                        if (error) {
                            console.log(error);
                        }
                        done();
                    });
            });
        it('Register user with valid data to register user and to send to login', (done) => {
            request(url)
                .post('/users/register')
                .type('form')
                .send({
                    firstname: 'FirstName',
                    lastname: 'LastName',
                    username: 'UserName',
                    password: '123456',
                    email: 'user@test.com',
                })
                .expect(302)
                .expect('Location', '/users/login')
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Login with wrong username stays on same page ', (done) => {
            request(url)
                .post('/users/login')
                .send({ username: 'random', password: '123456' })
                .expect(302)
                .expect('Location', '/users/login')
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Login with wrong password stays on same page ', (done) => {
            request(url)
                .post('/users/login')
                .send({ username: 'UserName', password: 'random' })
                .expect(302)
                .expect('Location', '/users/login')
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Login with right credentials sends to home page and set cookie',
            (done) => {
                request(url)
                    .post('/users/login')
                    .send({ username: 'UserName', password: '123456' })
                    .expect(302)
                    .expect('Location', '/')
                    .expect('set-cookie', /connect.sid/)
                    .end((error, response) => {
                        if (error) {
                            console.log(error);
                        }
                        done();
                    });
            });
    });

    describe('Loged User', () => {
        it('All Users route to redirect to home page if not loged in as admin',
            (done) => {
                createAuthenticatedRequest('/users/login', {
                        username: 'UserName',
                        password: '123456',
                    },
                    function(authRequest) {
                        authRequest
                            .get('/users')
                            .expect(302)
                            .expect('Location', '/')
                            .end((error, response) => {
                                if (error) {
                                    console.log(error);
                                }
                                done();
                            });
                    });
            });
        it('Chat route to redirect to home page if not loged in as admin',
            (done) => {
                createAuthenticatedRequest('/users/login', {
                        username: 'UserName',
                        password: '123456',
                    },
                    function(authRequest) {
                        authRequest
                            .get('/users/chat')
                            .expect(302)
                            .expect('Location', '/')
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
                    db.collection('users').update({ _username: 'UserName' }, {
                        $set: {
                            _role: 'admin',
                        },
                    });
                });
        });

        it('All Users route returns 200 when admin', (done) => {
            createAuthenticatedRequest('/users/login', {
                    username: 'UserName',
                    password: '123456',
                },
                function(authRequest) {
                    authRequest
                        .get('/users/')
                        .expect(200)
                        .expect('set-cookie', /connect.sid/)
                        .end((error, response) => {
                            if (error) {
                                console.log(error);
                            }
                            done();
                        });
                });
        });
        it('Chat returns when authenticated 200', (done) => {
            createAuthenticatedRequest('/users/login', {
                    username: 'UserName',
                    password: '123456',
                },
                function(authRequest) {
                    authRequest
                        .get('/users/chat')
                        .expect(200)
                        .expect('set-cookie', /connect.sid/)
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