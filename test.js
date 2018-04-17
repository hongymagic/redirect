const expect = require('expect.js');
const supertest = require('supertest');

describe('REDIRECT_URL', () => {
  it('should throw an error when loading', () => {
    const runner = () => {
      const server = require('./server');
      supertest(server);
    };

    expect(runner).to.throwException();
  });

  it('should throw an error when REDIRECT_URL contains search string ?', () => {
    const runner = () => {
      process.env.REDIRECT_URL = 'example.com?emoji=🌈';
      const server = require('./server');
      supertest(server);
    };

    expect(runner).to.throwException();
  });

  it('should issue default 301 redirect to given REDIRECT_URL', done => {
    const REDIRECT_URL = process.env.REDIRECT_URL = 'example.com';
    const server = require('./server');
    let request = supertest(server);

    request
      .get('/')
      .expect(301)
      .expect('Location', REDIRECT_URL)
      .end(() => {
        server.close();
        done();
      });
  });
});

describe('Optional environment variables', () => {
  it('should return STATUS', done => {
    const REDIRECT_URL = process.env.REDIRECT_URL = 'example.com';
    const STATUS = process.env.STATUS = 302;
    const server = require('./server');
    let request = supertest(server);

    request
      .get('/')
      .expect(STATUS)
      .end(() => {
        server.close();
        done();
      });
  });

  it('should return 200 OK if IGNORED_AGENTS matches', done => {
    const REDIRECT_URL = process.env.REDIRECT_URL = 'example.com';
    const INGORED_AGENTS = process.env.IGNORED_AGENTS = 'hongy-test,redirect-test';
    const server = require('./server');
    let request = supertest(server);

    request
      .get('/')
      .set('User-Agent', 'hongy-test/1.0')
      .expect(200)
      .end(() => {
        server.close();
        done();
      });
  });
  it('should redirect if IGNORED_AGENTS does not match', done => {
    const REDIRECT_URL = process.env.REDIRECT_URL = 'example.com';
    const INGORED_AGENTS = process.env.IGNORED_AGENTS = 'hongy-test,redirect-test';
    const server = require('./server');
    let request = supertest(server);

    request
      .get('/')
      .set('User-Agent', 'GoogleHC/1.0')
      .expect(200)
      .end(() => {
        server.close();
        done();
      });
  });
});
