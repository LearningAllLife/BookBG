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
describe('Integration Tests Books Routes', () => {
    describe('Not registered User and no books', () => {
        it('Books all partial should return right containt and code 200 ', (done) => {
            request(url)
                .get('/books/allpartial/1')
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Search through our library') < 0) {
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
        it('Books ordered by default should return 200 and right content ', (done) => {
            request(url)
                .post('/books/ordered')
                .send({
                    input: 'Default',
                })
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Search through our library') < 0) {
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
        it('Books ordered by not real order should return error message and 200 ', (done) => {
            request(url)
                .post('/books/ordered')
                .send({
                    input: 'wrong',
                })
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('wrong order') < 0) {
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
        it('Books by genre should return 200 ok nevermind what genre is send', (done) => {
            request(url)
                .get('/books/byGenre/1?input=romans')
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Search through our library') < 0) {
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
        it('Books by genre should return 200 ok nevermind what genre is send', (done) => {
            request(url)
                .get('/books/allResults')
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Search through our library') < 0) {
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
        it('Books by genre should return 200 ok nevermind what genre is send', (done) => {
            request(url)
                .get('/books/allResults')
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Search through our library') < 0) {
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
        it('Books search return 200 ok and right result', (done) => {
            request(url)
                .post('/books/search/1')
                .send({ input: '' })
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Search through our library') < 0) {
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
    describe('Not registered User and no books', () => {
        it('Books all partial should return right containt and code 200 ', (done) => {
            request(url)
                .get('/books/allpartial/1')
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Search through our library') < 0) {
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
        it('Books ordered by default should return 200 and right content ', (done) => {
            request(url)
                .post('/books/ordered')
                .send({
                    input: 'Default',
                })
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Search through our library') < 0) {
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
        it('Books ordered by not real order should return error message and 200 ', (done) => {
            request(url)
                .post('/books/ordered')
                .send({
                    input: 'wrong',
                })
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('wrong order') < 0) {
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
        it('Books by genre should return 200 ok nevermind what genre is send', (done) => {
            request(url)
                .get('/books/byGenre/1?input=romans')
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Search through our library') < 0) {
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
        it('All books should return 200 ok and right content', (done) => {
            request(url)
                .get('/books/allResults')
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Search through our library') < 0) {
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
        it('Books search return 200 ok and right result', (done) => {
            request(url)
                .post('/books/search/1')
                .send({ input: '' })
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Search through our library') < 0) {
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
    describe('Not registered User and books', () => {
        before(() => {
            return Promise.resolve()
                .then(() => {
                    return MongoClient.connect(connectionString);
                })
                .then((db) => {
                    const newId = new ObjectID('596b6aadc36e57168058ee1c');
                    db.collection('books').insertOne({
                        '_id': newId,
                        '_title': 'Gone with the Wind',
                        '_author': 'Margareth Mitchell',
                        '_genre': 'Romans',
                        '_rating': '10',
                        '_price': '54',
                        '_picture': 'https://assets.chitanka.info/thumb/book-cover/0e/3748.max.jpg',
                        '_isDeleted': false,
                    });
                    return db;
                })
                .then((db) => {
                    const newId = new ObjectID('596b6aadc36e57168058ee1c');
                    db.collection('genres').insertOne({
                        '_name': 'Romans',
                        '_books': [{
                            '_id': newId,
                            '_title': 'Gone with the Wind',
                            '_author': 'Margareth Mitchell',
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
                    const newId = new ObjectID('596b6aadc36e57168058ee1c');
                    return db.collection('authors').insertOne({
                        '_name': 'Margareth Mitchell',
                        '_books': [{
                            '_id': newId,
                            '_title': 'Gone with the Wind',
                            '_author': 'Margareth Mitchell',
                            '_genre': 'Romans',
                            '_rating': '10',
                            '_price': '54',
                            '_picture': 'https://assets.chitanka.info/thumb/book-cover/0e/3748.max.jpg',
                            '_isDeleted': false,
                        }],
                    });
                });
        });
        it('Try to add book must redirect to login if not loged as admin', (done) => {
            request(url)
                .get('/books/add')
                .expect(302)
                .expect('Location', '/users/login')
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Books all partial should return book and code 200 ', (done) => {
            request(url)
                .get('/books/allpartial/1')
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Gone with the Wind') < 0) {
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
        it('Books ordered by default should return 200 and book', (done) => {
            request(url)
                .post('/books/ordered')
                .send({
                    input: 'Default',
                })
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Gone with the Wind') < 0) {
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
        it('Books by wrong genre should return 200 and no books', (done) => {
            request(url)
                .get('/books/byGenre/1?input=romans')
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Gone with the Wind') >= 0) {
                        throw Error('found book');
                    }
                })
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Books by right genre should return 200 and book', (done) => {
            request(url)
                .get('/books/byGenre/1?input=Romans')
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Gone with the Wind') < 0) {
                        throw Error('No book');
                    }
                })
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Books by right genre but wrong page should return 200 and no book', (done) => {
            request(url)
                .get('/books/byGenre/2?input=Romans')
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Gone with the Wind') > 0) {
                        throw Error('found book');
                    }
                })
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('All Book should return 200 ok and books', (done) => {
            request(url)
                .get('/books/allResults')
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Gone with the Wind') < 0) {
                        throw Error('not book');
                    }
                })
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Books search return 200 ok and book if right search and page', (done) => {
            request(url)
                .post('/books/search/1')
                .send({ input: 'Gone with the Wind' })
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Gone with the Wind') < 0) {
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
        it('Books search return 200 ok no book if right page wrong search', (done) => {
            request(url)
                .post('/books/search/1')
                .send({ input: 'GonewiththeWindsdfas' })
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Gone with the Wind') > 0) {
                        throw Error('book found');
                    }
                })
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Books search return 200 ok no book if wrong page right search', (done) => {
            request(url)
                .post('/books/search/2')
                .send({ input: 'Gone with the Wind ' })
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Gone with the Wind') > 0) {
                        throw Error('book found');
                    }
                })
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Books by id should return book if right id', (done) => {
            request(url)
                .get('/books/596b6aadc36e57168058ee1c')
                .expect(200)
                .expect(function(res) {
                    if (res.text.indexOf('Gone with the Wind') < 0) {
                        throw Error('book not found');
                    }
                })
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    done();
                });
        });
        it('Books by id should not return book if wrong id and redirect to home page', (done) => {
            request(url)
                .get('/books/596b6aadc36e57168068ee2c')
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
    describe('Registered User as admin', () => {
        before(() => {
            return Promise.resolve()
                .then(() => {
                    return MongoClient.connect(connectionString);
                })
                .then((db) => {
                    db.collection('users').insertOne({
                        '_firstname': 'Book123',
                        '_lastname': 'Book123',
                        '_username': 'BookUser',
                        '_password': '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
                        '_email': 'books.kamburov@abv.bg',
                        '_role': 'admin',
                        '_isDeleted': false,
                    });
                });
        });
        it('Add Book  returns 200 ok location right', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'BookUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .get('/books/add')
                        .expect(200)
                        .end((error, response) => {
                            if (error) {
                                console.log(error);
                            }
                            done();
                        });
                });
        });
        it('Post to Add Book 302 ok location redirect to home page', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'BookUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .post('/books/add')
                        .type('form')
                        .send({
                            'title': 'test',
                            'author': 'testAuthor',
                            'genre': 'Romans',
                            'rating': 1,
                            'price': 10,
                            'picture': 'test',
                        })
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
        it('Post to Add Book with wrong rating should return to same page  ', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'BookUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .post('/books/add')
                        .type('form')
                        .send({
                            'title': 'testg',
                            'author': 'testAuthord',
                            'genre': 'Romans',
                            'rating': 0,
                            'price': 10,
                            'picture': 'test',
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
        });
        it('Post to Add Book with existing author and name should return to same page', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'BookUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .post('/books/add')
                        .type('form')
                        .send({
                            'title': 'Gone with the Wind',
                            'author': 'Margareth Mitchell',
                            'genre': 'Romans',
                            'rating': 0,
                            'price': 10,
                            'picture': 'test',
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
        });
        it('Delete book should return 200 ', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'BookUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .put('/books/delete')
                        .send({
                            'input': '596b6aadc36e57168058ee1c',
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
    describe('Registered User as user', () => {
        before(() => {
            return Promise.resolve()
                .then(() => {
                    return MongoClient.connect(connectionString);
                })
                .then((db) => {
                    db.collection('users').insertOne({
                        '_firstname': 'Book123',
                        '_lastname': 'Book123',
                        '_username': 'BookUserJustUser',
                        '_password': '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
                        '_email': 'books.kamburov@abv.bg',
                        '_role': 'user',
                        '_isDeleted': false,
                    });
                });
        });
        it('Add Book  returns 302 and redirect to home page', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'BookUserJustUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .get('/books/add')
                        .expect(302)
                        .expect('Location', '/')
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
        it('Post to Add Book 302 ok location redirect to home page', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'BookUserJustUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .post('/books/add')
                        .type('form')
                        .send({
                            'title': 'test',
                            'author': 'testAuthor',
                            'genre': 'Romans',
                            'rating': 1,
                            'price': 10,
                            'picture': 'test',
                        })
                        .expect(302)
                        .expect('Location', '/')
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
        it('Delete book should return 302 and redirect page ', (done) => {
            createAuthenticatedRequest('/users/login', { username: 'BookUserJustUser', password: '123456' },
                function(authRequest) {
                    authRequest
                        .put('/books/delete')
                        .send({
                            'input': '596b6aadc36e57168058ee1c',
                        })
                        .expect(302)
                        .expect('Location', '/')
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
    });
});