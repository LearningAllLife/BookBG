const request = require('supertest');

const { init } = require('../../app');

const url = 'http://localhost:3002';


describe('Integration Tests users Routes', () => {
    describe('Get pages', () => {
        // it('All Users to return status 302 when not admin', (done) => {
        //     request(url)
        //         .get('/users/')
        //         .expect(302, done);
        // });
        // it('Login page to return status 200', (done) => {
        //     request(url)
        //         .get('/users/login')
        //         .expect(200, done);
        // });
        // it('Register page to return status 200', (done) => {
        //     request(url)
        //         .get('/users/register')
        //         .expect(200, done);
        // });
        // it('Chat page to return status 302 when not logged in', (done) => {
        //     request(url)
        //         .get('/users/chat')
        //         .expect(302, done);
        // });
        it('Register user with valid data to register user', (done) => {
            request(url)
                .post('/users/register')
                .send({
                    firstname: 'FirstName',
                    lastname: 'LastName',
                    username: 'UserName',
                    password: '123456',
                    email: 'user@test.com',
                })
                .expect(200, done)
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                        done(error);
                    }
                    done();
                });
        });

        // it('Login with wrong details', (done) => {
        //     request(url)
        //         .post('/users/login')
        //         .send({ username: 'random', password: 'random' })
        //         .expect(200)
        //         .end((error, response) => {
        //             if (error) {
        //                 console.log(error);
        //             }
        //             done();
        //         });
        // });
        // it('Seriallize user', (done) => {
        //     request(url)
        //         .post('/auth/login')
        //         .send({ username: 'Vasil', password: '123456' })
        //         .expect('set-cookie', 'cookie=connect.sid; Path=/')
        //         .expect(200)
        //         .end((error, response) => {
        //             if (error) {
        //                 console.log(error);
        //             }
        //             done();
        //         });
        // });
    });
});
