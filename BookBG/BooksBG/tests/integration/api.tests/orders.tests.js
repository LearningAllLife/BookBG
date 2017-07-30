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

describe('Integration Tests Orders API Routes', () => {
    describe('Not registered User and orders', () => {
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