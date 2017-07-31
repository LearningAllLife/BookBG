/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len,eol-last*/
const request = require('supertest');
const url = 'http://localhost:3002';
const connectionString = 'mongodb://localhost/books-db-test';
const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');

describe('Integration Tests Authors API Routes', () => {
    after(() => {
        return Promise.resolve()
            .then(() => {
                return MongoClient.connect(connectionString);
            })
            .then((db) => {
                return db.dropDatabase();
            });
    });
    describe('Not registered User and authors', () => {
        before(() => {
            const newId = new ObjectID('556b6aadc35e57157158ee1c');
            return Promise.resolve()
                .then(() => {
                    return MongoClient.connect(connectionString);
                })
                .then((db) => {
                    db.collection('books').insertOne({
                        '_id': newId,
                        '_title': 'Gone with the Wind3',
                        '_author': 'Margareth Mitchell22',
                        '_genre': 'Action',
                        '_rating': '10',
                        '_price': '54',
                        '_picture': 'https://assets.chitanka.info/thumb/book-cover/0e/3748.max.jpg',
                        '_isDeleted': false,
                    });
                    return db;
                })
                .then((db) => {
                    db.collection('genres').insertOne({
                        '_name': 'Action',
                        '_books': [{
                            '_id': newId,
                            '_title': 'Gone with the Wind3',
                            '_author': 'Margareth Mitchell22',
                            '_genre': 'Action',
                            '_rating': '10',
                            '_price': '54',
                            '_picture': 'https://assets.chitanka.info/thumb/book-cover/0e/3748.max.jpg',
                            '_isDeleted': false,
                        }],
                    });
                    return db;
                })
                .then((db) => {
                    return db.collection('authors').insertOne({
                        '_name': 'Margareth Mitchell22',
                        '_books': [{
                            '_id': newId,
                            '_title': 'Gone with the Wind3',
                            '_author': 'Margareth Mitchell22',
                            '_genre': 'Action',
                            '_rating': '10',
                            '_price': '54',
                            '_picture': 'https://assets.chitanka.info/thumb/book-cover/0e/3748.max.jpg',
                            '_isDeleted': false,
                        }],
                    });
                });
        });
        it('Get all authors should return author as json', (done) => {
            request(url)
                .get('/api/authors/')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(function(res) {
                    if (res.body[0]._name !== 'Margareth Mitchell22' ||
                        res.body[0]._books[0]._genre !== 'Action' ||
                        res.body[0]._books[0]._author !== 'Margareth Mitchell22') {
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