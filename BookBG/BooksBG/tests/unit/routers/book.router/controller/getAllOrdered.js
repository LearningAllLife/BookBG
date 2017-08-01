/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last,max-len*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../../../app/routers/books.router/controller');

describe('books controller getAllOrdered()', () => {
    let req = null;
    let res = null;
    let data = null;
    let controller = null;

    let booksArray = [{
        isUpdated: false,
        _id: 1,
        _title: 'bookA',
        _genre: 'testgenreA',
        _author: 'atestauthorA',
    }, {
        isUpdated: false,
        _id: 2,
        _title: 'bookB',
        _genre: 'testgenreB',
        _author: 'btestauthorB',
    }, {
        isUpdated: false,
        _id: 3,
        _title: 'bookC',
        _genre: 'testgenreC',
        _author: 'ctestauthorC',
    }];

    beforeEach(() => {
        req = require('../../../../unit/reqres').getRequestMock();
        res = require('../../../../unit/reqres').getResponseMock();
    });

    afterEach(() => {
        booksArray = [{
            isUpdated: false,
            _id: 1,
            _title: 'bookA',
            _genre: 'testgenreA',
            _author: 'atestauthorA',
        }, {
            isUpdated: false,
            _id: 2,
            _title: 'bookB',
            _genre: 'testgenreB',
            _author: 'btestauthorB',
        }, {
            isUpdated: false,
            _id: 3,
            _title: 'bookC',
            _genre: 'testgenreC',
            _author: 'ctestauthorC',
        }];
    });

    it('expect to call getAll() once', () => {
        data = {
            books: {
                getAll: () => {
                    return Promise.resolve(booksArray);
                },
            },
        };

        controller = init(data);
        req.body = { input: 'sometest' };
        const spy1 = sinon.spy(data.books, 'getAll');

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(spy1.callCount).to.equal(1);
            });
    });

    it('expect to call getAll() to trow error when invalid order', () => {
        data = {
            books: {
                getAll: () => {
                    return Promise.resolve(booksArray);
                },
            },
        };

        controller = init(data);
        req.body = { input: 'invalidtest' };
        const spy1 = sinon.spy(data.books, 'getAll');

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(spy1.threw);
            });
    });

    it('expect to call getAll() default to return all books in default and render corretly isAdmin when there is no user', () => {
        data = {
            books: {
                getAll: () => {
                    return Promise.resolve(booksArray);
                },
            },
        };

        controller = init(data);
        req.body = { input: 'Default' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.context.isAdmin).to.equal(false);
            });
    });

    it('expect to call getAll() default to return all books in default and render corretly result with user', () => {
        data = {
            books: {
                getAll: () => {
                    return Promise.resolve(booksArray);
                },
            },
        };

        controller = init(data);
        req.body = { input: 'Default' };
        req.user = { _role: 'admin' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.context.isAdmin).to.equal(true);
            });
    });

    it('expect to call getAll() default to return all books in default and render corretly result with user', () => {
        data = {
            books: {
                getAll: () => {
                    return Promise.resolve(booksArray);
                },
            },
        };

        controller = init(data);
        req.body = { input: 'Default' };
        req.user = { _role: 'user' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.context.isAdmin).to.equal(false);
            });
    });

    it('expect to call getAll() default to return all books in default and render corretly viewModel', () => {
        data = {
            books: {
                getAll: () => {
                    return Promise.resolve(booksArray);
                },
            },
        };

        controller = init(data);
        req.body = { input: 'Default' };
        req.user = { _role: 'user' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.viewName)
                    .to.equal('books/partialViews/booksContent.pug');
            });
    });

    it('expect Default to return correct result', () => {
        data = {
            books: {
                getAll: () => {
                    return Promise.resolve(booksArray);
                },
            },
        };

        controller = init(data);
        req.body = { input: 'Default' };
        req.user = { _role: 'user' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.context.context).to.deep.equal(booksArray);
            });
    });

    it('expect Athor ascending to return correct result', () => {
        data = {
            books: {
                getAll: () => {
                    return Promise.resolve(booksArray);
                },
            },
        };

        controller = init(data);
        req.body = { input: 'Author ascending' };
        req.user = { _role: 'user' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.context.context[0]._title).to.deep.equal('bookA');
                expect(res.context.context[0]._author)
                    .to.deep.equal('atestauthorA');
            });
    });

    it('expect Athor descending to return correct result', () => {
        const desArray = [{
            isUpdated: false,
            _id: 1,
            _title: 'bookA',
            _genre: 'testgenreA',
            _author: 'atestauthorA',
            _price: 1,
        }, {
            isUpdated: false,
            _id: 2,
            _title: 'bookB',
            _genre: 'testgenreB',
            _author: 'btestauthorB',
            _price: 6,
        }, {
            isUpdated: false,
            _id: 3,
            _title: 'bookC',
            _genre: 'testgenreC',
            _author: 'ctestauthorC',
            _price: 3,
        }];

        data = {
            books: {
                getAll: () => {
                    return Promise.resolve(desArray);
                },
            },
        };

        controller = init(data);
        req.body = { input: 'Author descending' };
        req.user = { _role: 'user' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.context.context[0]._title).to.deep.equal('bookC');
                expect(res.context.context[0]._author)
                    .to.deep.equal('ctestauthorC');
                expect(res.context.context[2]._title).to.deep.equal('bookA');
                expect(res.context.context[2]._author)
                    .to.deep.equal('atestauthorA');
            });
    });

    it('expect price descending to work correcty', () => {
        const priceArray = [{
            isUpdated: false,
            _id: 1,
            _title: 'bookA',
            _genre: 'testgenreA',
            _author: 'atestauthorA',
            _price: 1,
        }, {
            isUpdated: false,
            _id: 2,
            _title: 'bookB',
            _genre: 'testgenreB',
            _author: 'btestauthorB',
            _price: 6,
        }, {
            isUpdated: false,
            _id: 3,
            _title: 'bookC',
            _genre: 'testgenreC',
            _author: 'ctestauthorC',
            _price: 3,
        }];

        data = {
            books: {
                getAll: () => {
                    return Promise.resolve(priceArray);
                },
            },
        };

        controller = init(data);
        req.body = { input: 'Price descending' };
        req.user = { _role: 'user' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.context.context[0]._title).to.deep.equal('bookB');
                expect(res.context.context[0]._author)
                    .to.deep.equal('btestauthorB');
                expect(res.context.context[2]._title)
                    .to.deep.equal('bookA');
                expect(res.context.context[2]._author)
                    .to.deep.equal('atestauthorA');
            });
    });

    it('expect price descending to work correcty', () => {
        const priceasArray = [{
            isUpdated: false,
            _id: 1,
            _title: 'bookA',
            _genre: 'testgenreA',
            _author: 'atestauthorA',
            _price: 1,
        }, {
            isUpdated: false,
            _id: 2,
            _title: 'bookB',
            _genre: 'testgenreB',
            _author: 'btestauthorB',
            _price: 6,
        }, {
            isUpdated: false,
            _id: 3,
            _title: 'bookC',
            _genre: 'testgenreC',
            _author: 'ctestauthorC',
            _price: 3,
        }];

        data = {
            books: {
                getAll: () => {
                    return Promise.resolve(priceasArray);
                },
            },
        };

        controller = init(data);
        req.body = { input: 'Price ascending' };
        req.user = { _role: 'user' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.context.context[0]._title).to.deep.equal('bookA');
                expect(res.context.context[0]._author)
                    .to.deep.equal('atestauthorA');
                expect(res.context.context[2]._title)
                    .to.deep.equal('bookB');
                expect(res.context.context[2]._author)
                    .to.deep.equal('btestauthorB');
            });
    });

    it('expect Title descending to work correcty', () => {
        const titleArray = [{
            isUpdated: false,
            _id: 1,
            _title: 'bookA',
            _genre: 'testgenreA',
            _author: 'atestauthorA',
            _price: 1,
        }, {
            isUpdated: false,
            _id: 2,
            _title: 'bookB',
            _genre: 'testgenreB',
            _author: 'btestauthorB',
            _price: 6,
        }, {
            isUpdated: false,
            _id: 3,
            _title: 'bookC',
            _genre: 'testgenreC',
            _author: 'ctestauthorC',
            _price: 3,
        }];

        data = {
            books: {
                getAll: () => {
                    return Promise.resolve(titleArray);
                },
            },
        };

        controller = init(data);
        req.body = { input: 'Title descending' };
        req.user = { _role: 'user' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.context.context[0]._title).to.deep.equal('bookC');
                expect(res.context.context[0]._author)
                    .to.deep.equal('ctestauthorC');
                expect(res.context.context[2]._title)
                    .to.deep.equal('bookA');
                expect(res.context.context[2]._author)
                    .to.deep.equal('atestauthorA');
            });
    });

    it('expect Title ascending to work correcty', () => {
        const titleasArray = [{
            isUpdated: false,
            _id: 1,
            _title: 'bookA',
            _genre: 'testgenreA',
            _author: 'atestauthorA',
            _price: 1,
        }, {
            isUpdated: false,
            _id: 2,
            _title: 'bookB',
            _genre: 'testgenreB',
            _author: 'btestauthorB',
            _price: 6,
        }, {
            isUpdated: false,
            _id: 3,
            _title: 'bookC',
            _genre: 'testgenreC',
            _author: 'ctestauthorC',
            _price: 3,
        }];

        data = {
            books: {
                getAll: () => {
                    return Promise.resolve(titleasArray);
                },
            },
        };

        controller = init(data);
        req.body = { input: 'Title ascending' };
        req.user = { _role: 'user' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.context.context[0]._title).to.deep.equal('bookA');
                expect(res.context.context[0]._author)
                    .to.deep.equal('atestauthorA');
                expect(res.context.context[2]._title)
                    .to.deep.equal('bookC');
                expect(res.context.context[2]._author)
                    .to.deep.equal('ctestauthorC');
            });
    });
});