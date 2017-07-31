/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len,eol-last*/
const request = require('supertest');
const url = 'http://localhost:3002';
const connectionString = 'mongodb://localhost/books-db-test';
const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');

describe('Integration Tests Genres API Routes', () => {
    after(() => {
        return Promise.resolve()
            .then(() => {
                return MongoClient.connect(connectionString);
            })
            .then((db) => {
                return db.dropDatabase();
            });
    });
    describe('Not registered User and genres', () => {
        before(() => {
            const newId = new ObjectID('556b6aadc29e67257158ee1c');
            return Promise.resolve()
                .then(() => {
                    return MongoClient.connect(connectionString);
                })
                .then((db) => {
                    db.collection('books').insertOne({
                        '_id': newId,
                        '_title': 'Gone with the Wind12',
                        '_author': 'Margareth Mitchell12',
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
                            '_title': 'Gone with the Wind12',
                            '_author': 'Margareth Mitchell12',
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
                        '_name': 'Margareth Mitchell12',
                        '_books': [{
                            '_id': newId,
                            '_title': 'Gone with the Wind12',
                            '_author': 'Margareth Mitchell12',
                            '_genre': 'Action',
                            '_rating': '10',
                            '_price': '54',
                            '_picture': 'https://assets.chitanka.info/thumb/book-cover/0e/3748.max.jpg',
                            '_isDeleted': false,
                        }],
                    });
                });
        });
        it('Get all genres should return genres as json', (done) => {
            request(url)
                .get('/api/genres/')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(function(res) {
                    if (res.body[0]._name !== 'Action' ||
                        res.body[0]._books[0]._title !== 'Gone with the Wind12' ||
                        res.body[0]._books[0]._author !== 'Margareth Mitchell12') {
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