/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len,eol-last*/
const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');

const populateDatabase = function(connectionString) {
    return Promise.resolve()
        .then(() => {
            return MongoClient.connect(connectionString);
        })
        .then((db) => {
            const arrayOfPromise = [];
            const newUserId = new ObjectID('697c89843297952c20f2a9d3');
            const newBookId = new ObjectID('596b6aadc36e57168058ee1c');
            const newGenreId = new ObjectID('596b6aadc36e57168058ee1c');
            const newAuthorId = new ObjectID('596b6aadc36e57168058ee1c');
            arrayOfPromise.push(db.collection('users').insertOne({
                '_id': newUserId,
                '_firstname': 'Vasil',
                '_lastname': 'Test',
                '_username': 'WebDriverTestUser',
                '_password': '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
                '_email': 'books.kamburov@abv.bg',
                '_role': 'user',
                '_isDeleted': false,
            }));
            arrayOfPromise.push(
                db.collection('books').insertOne({
                    '_id': newBookId,
                    '_title': 'Gone with the Wind',
                    '_author': 'Margareth Mitchell',
                    '_genre': 'Romans',
                    '_rating': '10',
                    '_price': '54',
                    '_picture': 'https://assets.chitanka.info/thumb/book-cover/0e/3748.max.jpg',
                    '_isDeleted': false,
                }));
            arrayOfPromise.push(
                db.collection('genres').insertOne({
                    '_name': 'Romans',
                    '_books': [{
                        '_id': newGenreId,
                        '_title': 'Gone with the Wind',
                        '_author': 'Margareth Mitchell',
                        '_genre': 'Romans',
                        '_rating': '10',
                        '_price': '54',
                        '_picture': 'https://assets.chitanka.info/thumb/book-cover/0e/3748.max.jpg',
                        '_isDeleted': false,
                    }],
                }));
            arrayOfPromise.push(
                db.collection('authors').insertOne({
                    '_name': 'Margareth Mitchell',
                    '_books': [{
                        '_id': newAuthorId,
                        '_title': 'Gone with the Wind',
                        '_author': 'Margareth Mitchell',
                        '_genre': 'Romans',
                        '_rating': '10',
                        '_price': '54',
                        '_picture': 'https://assets.chitanka.info/thumb/book-cover/0e/3748.max.jpg',
                        '_isDeleted': false,
                    }],
                }));

            return Promise.all(arrayOfPromise);
        });
};
module.exports = { populateDatabase };