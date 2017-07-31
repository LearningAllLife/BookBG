/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const webdriver = require('selenium-webdriver');
const ui = require('./utils/ui');
const async = require('../../utils/async');
const connectionString = 'mongodb://localhost/books-db-test';
const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
const { populateDatabase } = require('./utils/db.populate');

const checkForCetainElement = function(selector, elementText) {
    return async()
        .then(() => {
            return ui.waitFor(selector);
        })
        .then((el) => {
            return el.getText();
        })
        .then((text) => {
            expect(text).to.contain(elementText);
        });
};

const logUser = function(username, password) {
    return Promise.resolve()
        .then(() => ui.click('#nav-btn-login'))
        .then(() => ui.setValue('input[name="username"]', username))
        .then(() => ui.setValue('input[name="password"]', password))
        .then(() => ui.click('button[type="submit"]'));
};

describe('Items routes', () => {
    let driver = null;
    // const driver =
    //     new webdriver.Builder()
    //     .build();
    const appUrl = 'http://localhost:3002';
    before(() => {
        return async()
            .then(() => populateDatabase(connectionString));
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

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
        return driver.get(appUrl);
    });

    afterEach(() => {
        return driver.quit();
    });

    // describe('Not loged user routes', () => {
    //     it('expect h1 with text "Search through our library"', () => {
    //         return checkForCetainElement('h1', 'Search through our library')
    //             .then(() => {
    //                 return checkForCetainElement('#genresDropdown', '');
    //             })
    //             .then(() => {
    //                 return checkForCetainElement('#nav-btn-register', 'Register');
    //             })
    //             .then(() => {
    //                 return checkForCetainElement('#nav-btn-login', 'Login');
    //             })
    //             .then(() => {
    //                 return checkForCetainElement('#search-input', '');
    //             })
    //             .then(() => {
    //                 return checkForCetainElement('#navbar-brand-id', 'Books.bg');
    //             })
    //             .then(() => {
    //                 return checkForCetainElement('#search-btn', 'Search');
    //             })
    //             .then(() => {
    //                 return checkForCetainElement('#orderby', '');
    //             });
    //     });
    //     it('Login button leads to login form', () => {
    //         return async()
    //             .then(() => ui.click('#nav-btn-login'))
    //             .then(() => {
    //                 return driver.findElement(
    //                     webdriver.By.css('form[action="/users/login"]'));
    //             })
    //             .then((element) => {
    //                 return element.getText();
    //             })
    //             .then((text) => {
    //                 expect(text).to.contain('Username');
    //             });
    //     });
    //     it('Register button leads to register form', () => {
    //         return async()
    //             .then(() => ui.click('#nav-btn-register'))
    //             .then(() => {
    //                 return driver.findElement(
    //                     webdriver.By.css('form[action="/users/register"]'));
    //             })
    //             .then((element) => {
    //                 return element.getText();
    //             })
    //             .then((text) => {
    //                 expect(text).to.contain('Firstname');
    //                 expect(text).to.contain('LastName');
    //                 expect(text).to.contain('Email address:');
    //                 expect(text).to.contain('Username');
    //                 expect(text).to.contain('Password');
    //             });
    //     });
    // });

    // it('Book should be there', () => {
    //     return async()
    //         .then(() => {
    //             return checkForCetainElement('a.book-title', 'Gone with the Wind');
    //         })
    //         .then(() => {
    //             return checkForCetainElement('a.book-author', 'Margareth Mitchell');
    //         });
    // });
    // it('Click on book title leads to book page', () => {
    //     return async()
    //         .then(() => ui.click('a.book-title'))
    //         .then(() => {
    //             return driver.getCurrentUrl();
    //         })
    //         .then((url) => {
    //             expect(url).to.contain('/books/596b6aadc36e57168058ee1c');
    //         });
    // });
    // it('Click on book author leads to author page', () => {
    //     return async()
    //         .then(() => ui.click('a.book-author'))
    //         .then(() => {
    //             return driver.getCurrentUrl();
    //         })
    //         .then((url) => {
    //             expect(url).to.contain('/authors/Margareth%20Mitchell');
    //         });
    // });
    // it('Search for right content returns book', () => {
    //     return async()
    //         .then(() => ui.setValue('#search-input', 'Gone with the Wind'))
    //         .then(() => ui.click('#search-btn'))
    //         .then(() => {
    //             driver.sleep(500);
    //             return driver.findElements(webdriver.By.linkText('Gone with the Wind'));
    //         })
    //         .then((array) => {
    //             expect(array).to.have.length(1);
    //         });
    // });
    // it('Search for wrong content doesnt return book', () => {
    //     return async()
    //         .then(() => ui.setValue('#search-input', 'afasfasf'))
    //         .then(() => ui.click('#search-btn'))
    //         .then(() => {
    //             driver.sleep(500);
    //             return driver.findElements(webdriver.By.linkText('Gone with the Wind'));
    //         })
    //         .then((array) => {
    //             expect(array).to.have.length(0);
    //         });
    // });

    describe('loged user not admin', () => {
        beforeEach(() => {
            return async()
                .then(() => {
                    return logUser('WebDriverTestUser', '123456');
                });
        });
        it('shoping card should be there', () => {
            return async()
                .then(() => {
                    return checkForCetainElement('#shoping-card', '');
                });
        });
        it('Click on  books leads book page with add to card button', () => {
            return async()
                .then(() => ui.click('a.book-title'))
                .then(() => {
                    return checkForCetainElement('#btn-add-to-cart', 'Add to cart');
                });
        });
    });
    describe('loged user as admin', () => {
        before(() => {
            return Promise.resolve()
                .then(() => {
                    return MongoClient.connect(connectionString);
                })
                .then((db) => {
                    db.collection('users').update({ _username: 'WebDriverTestUser' }, {
                        $set: {
                            _role: 'admin',
                        },
                    });
                    return db;
                });
        });
        beforeEach(() => {
            return async()
                .then(() => {
                    return logUser('WebDriverTestUser', '123456');
                });
        });
        it('expect all admin buttons on main page to be there', () => {
            return async()
                .then(() => {
                    return checkForCetainElement('#nav-btn-addbook', 'Add Book');
                })
                .then(() => {
                    return checkForCetainElement('#nav-btn-addgenre', 'Add Genre');
                })
                .then(() => {
                    return checkForCetainElement('#nav-btn-allorders', 'All Orders');
                })
                .then(() => {
                    return checkForCetainElement('#nav-btn-chat', 'Chats Support');
                })
                .then(() => {
                    return checkForCetainElement('#nav-btn-users', 'All Users');
                })
                .then(() => {
                    return checkForCetainElement('#nav-btn-addauthor', 'Add Author');
                });
        });
        it('Click on addbook title leads to addbook page', () => {
            return async()
                .then(() => ui.click('#nav-btn-addbook'))
                .then(() => {
                    return driver.getCurrentUrl();
                })
                .then((url) => {
                    expect(url).to.contain('/books/add');
                });
        });
        it('Click on addgenre  leads to addgenre page', () => {
            return async()
                .then(() => ui.click('#nav-btn-addgenre'))
                .then(() => {
                    return driver.getCurrentUrl();
                })
                .then((url) => {
                    expect(url).to.contain('/genres/add');
                });
        });
        it('Click on All Orders  leads to All Orders page', () => {
            return async()
                .then(() => ui.click('#nav-btn-allorders'))
                .then(() => {
                    return driver.getCurrentUrl();
                })
                .then((url) => {
                    expect(url).to.contain('/orders/all');
                });
        });
        it('Click on Chat  leads to ChatSupport page', () => {
            return async()
                .then(() => ui.click('#nav-btn-chat'))
                .then(() => {
                    return driver.getCurrentUrl();
                })
                .then((url) => {
                    expect(url).to.contain('/users/chat');
                });
        });
        it('Click on All users leads to all users page', () => {
            return async()
                .then(() => ui.click('#nav-btn-users'))
                .then(() => {
                    return driver.getCurrentUrl();
                })
                .then((url) => {
                    expect(url).to.contain('/users/');
                });
        });
        it('Click on Add author leads to add author page', () => {
            return async()
                .then(() => ui.click('#nav-btn-addauthor'))
                .then(() => {
                    return driver.getCurrentUrl();
                })
                .then((url) => {
                    expect(url).to.contain('/authors/add');
                });
        });
    });
});
