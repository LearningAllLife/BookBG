/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last*/
/* eslint-disable no-unused-expressions,max-len,no-unused-vars */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const webdriver = require('selenium-webdriver');
const ui = require('./utils/ui');
const async = require('../../utils/async');
const connectionString = 'mongodb://localhost/books-db-test';
const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
const { populateDatabase } = require('./utils/db.populate');
const booksutils = require('./utils/book.utils.js');

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
        driver.manage().window().maximize();
        ui.setDriver(driver);
        return driver.get(appUrl);
    });

    afterEach(() => {
        return driver.quit();
    });

    describe('Not loged user routes', () => {
        it('expect h1 with text "Search through our library"', () => {
            return checkForCetainElement('h1', 'Search through our library')
                .then(() => {
                    return checkForCetainElement('#genresDropdown', '');
                })
                .then(() => {
                    return checkForCetainElement('#nav-btn-register', 'Register');
                })
                .then(() => {
                    return checkForCetainElement('#nav-btn-login', 'Login');
                })
                .then(() => {
                    return checkForCetainElement('#search-input', '');
                })
                .then(() => {
                    return checkForCetainElement('#navbar-brand-id', 'Books.bg');
                })
                .then(() => {
                    return checkForCetainElement('#search-btn', 'Search');
                })
                .then(() => {
                    return checkForCetainElement('#orderby', '');
                });
        });
        it('Login button leads to login form', () => {
            return async()
                .then(() => ui.click('#nav-btn-login'))
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('form[action="/users/login"]'));
                })
                .then((element) => {
                    return element.getText();
                })
                .then((text) => {
                    expect(text).to.contain('Username');
                });
        });
        it('Register button leads to register form', () => {
            return async()
                .then(() => ui.click('#nav-btn-register'))
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('form[action="/users/register"]'));
                })
                .then((element) => {
                    return element.getText();
                })
                .then((text) => {
                    expect(text).to.contain('Firstname');
                    expect(text).to.contain('LastName');
                    expect(text).to.contain('Email address:');
                    expect(text).to.contain('Username');
                    expect(text).to.contain('Password');
                });
        });
    });

    it('Book should be there', () => {
        return async()
            .then(() => {
                return checkForCetainElement('a.book-title', 'Gone with the Wind');
            })
            .then(() => {
                return checkForCetainElement('a.book-author', 'Margareth Mitchell');
            });
    });
    it('Click on book title leads to book page', () => {
        return async()
            .then(() => ui.click('a.book-title'))
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                expect(url).to.contain('/books/596b6aadc36e57168058ee1c');
            });
    });
    it('Click on book author leads to author page', () => {
        return async()
            .then(() => ui.click('a.book-author'))
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                expect(url).to.contain('/authors/Margareth%20Mitchell');
            });
    });
    it('Search for right content returns book', () => {
        return async()
            .then(() => ui.setValue('#search-input', 'Gone with the Wind'))
            .then(() => ui.click('#search-btn'))
            .then(() => {
                driver.sleep(500);
                return driver.findElements(webdriver.By.linkText('Gone with the Wind'));
            })
            .then((array) => {
                expect(array).to.have.length(1);
            });
    });
    it('Search for wrong content doesnt return book', () => {
        return async()
            .then(() => ui.setValue('#search-input', 'afasfasf'))
            .then(() => ui.click('#search-btn'))
            .then(() => {
                driver.sleep(500);
                return driver.findElements(webdriver.By.linkText('Gone with the Wind'));
            })
            .then((array) => {
                expect(array).to.have.length(0);
            });
    });

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
        it('Creating new order should show it on all orders page', () => {
            return async()
                .then(() => ui.click('.book-title'))
                .then(() => ui.click('#btn-add-to-cart'))
                .then(() => {
                    ui.click('#shoping-card');
                })
                .then(() => {
                    return driver.sleep(1000);
                })
                .then(() => {
                    return ui.getTexts('.book-title');
                })
                .then((texts) => {
                    return expect(texts).to.be.contain('Gone with the Wind');
                })
                .then(() => ui.click('#checkout'))
                .then(() => {
                    return ui.getText('.book-characteristics h4 span');
                })
                .then((title) => {
                    return expect(title).to.be.equal('Title:Gone with the Wind');
                })
                .then(() => ui.setValue('#phonenumberphone', 123456))
                .then(() => ui.setValue('#address', 'Home'))
                .then(() => ui.click('#confirm-order'))
                .then(() => {
                    driver.sleep(1000);
                    return ui.getTexts('h1');
                })
                .then((h1s) => {
                    expect(h1s).to.contain('You`ve made successfull order!');
                })
                .then(() => ui.click('#nav-btn-allorders'))
                .then(() => {
                    return ui.getTexts('.books-container-small span');
                })
                .then((texts) => {
                    expect(texts).to.contain('Title: Gone with the Wind');
                });
        });
        it('Register new user should show it on all orders page', () => {
            return async()
                .then(() => ui.click('#nav-btn-logout'))
                .then(() => ui.click('#nav-btn-register'))
                .then(() => ui.setValue('#firstName', 'FirstName'))
                .then(() => ui.setValue('#lastName', 'SecondName'))
                .then(() => ui.setValue('#email', 'easy@vasko.com'))
                .then(() => ui.setValue('#username', 'SecondUser'))
                .then(() => ui.setValue('#pwd', 123456))
                .then(() => ui.click('button[type="submit"]'))
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('form[action="/users/login"]'));
                })
                .then((element) => {
                    return element.getText();
                })
                .then((text) => {
                    expect(text).to.contain('Username');
                })
                .then(() => ui.setValue('#username', 'WebDriverTestUser'))
                .then(() => ui.setValue('#pwd', '123456'))
                .then(() => ui.click('button[type="submit"]'))
                .then(() => ui.click('#nav-btn-users'))
                .then(() => {
                    driver.sleep(500);
                    return ui.getTexts('.user-characteristics h4 span');
                })
                .then((texts) => {
                    expect(texts).to.contain('Username: SecondUser');
                });
        });
        it('Create books should show them on home page', () => {
            const booksCount = 4;
            booksutils.setDriver(driver);
            const itemTexts = Array.from({ length: booksCount })
                .map((_, index) => 'Book ' + index);
            return async()
                .then(() => {
                    return itemTexts.reduce(
                        (pr, text) =>
                        pr.then(() => booksutils.createItem(text)),
                        Promise.resolve());
                })
                .then((a) => {
                    driver.sleep(500);
                    return ui.getTexts('a.book-title');
                })
                .then((texts) => {
                    expect(texts).to.has.length(booksCount + 1);
                    texts = texts.slice(1);
                    texts.forEach((text) => {
                        expect(itemTexts).to.contain(text);
                    });
                });
        });
        it('Add genre should show it in dropdown', () => {
            return async()
                .then(() => ui.click('#nav-btn-addgenre'))
                .then(() => ui.setValue('input[name="genre"]', 'New Genre'))
                .then(() => ui.click('button[type="submit"]'))
                .then(() => {
                    driver.sleep(500);
                    ui.click('.form-control.btn.btn-default.dropdown-toggle');
                })
                .then(() => {
                    driver.sleep(500);
                    return driver.findElements(webdriver.By.linkText('New Genre'));
                })
                .then((texts) => {
                    expect(texts).to.have.length(1);
                });
        });
        it('Click on All users leads to all users page where shows current user', () => {
            return async()
                .then(() => ui.click('#nav-btn-users'))
                .then(() => {
                    return ui.getTexts('.user-characteristics h4 span');
                })
                .then((texts) => {
                    expect(texts).to.contain('Username: WebDriverTestUser');
                });
        });
    });
});