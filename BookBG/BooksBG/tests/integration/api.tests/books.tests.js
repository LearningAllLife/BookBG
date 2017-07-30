const request = require('supertest');
const url = 'http://localhost:3002';
const connectionString = 'mongodb://localhost/books-db-test';
const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');

describe('Integration Tests Books API Routes', () => {
    describe('Not registered User and books', () => {
        before(() => {
            const newId = new ObjectID('556b6aadc35e57168058ee1c');
            return Promise.resolve()
                .then(() => {
                    return MongoClient.connect(connectionString);
                })
                .then((db) => {
                    db.collection('books').insertOne({
                        '_id': newId,
                        '_title': 'Gone with the Wind3',
                        '_author': 'Margareth Mitchell2',
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
                            '_author': 'Margareth Mitchell2',
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
                        '_name': 'Margareth Mitchell2',
                        '_books': [{
                            '_id': newId,
                            '_title': 'Gone with the Wind3',
                            '_author': 'Margareth Mitchell2',
                            '_genre': 'Action',
                            '_rating': '10',
                            '_price': '54',
                            '_picture': 'https://assets.chitanka.info/thumb/book-cover/0e/3748.max.jpg',
                            '_isDeleted': false,
                        }],
                    });
                });
        });
        it('Get all books should return book as json', (done) => {
            request(url)
                .get('/api/books/')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(function(res) {
                    if (res.body[0]._title !== 'Gone with the Wind3' ||
                        res.body[0]._genre !== 'Action' ||
                        res.body[0]._author !== 'Margareth Mitchell2') {
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
