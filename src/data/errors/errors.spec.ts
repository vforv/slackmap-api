import {ValidationError, InternalError} from './errors';
import {expect} from '@slackmap/testing';
const util = require('util');

describe('domain errors', () => {
  it('should throw InternalError', () => {
    try {
      function doSomethingBad2() {
        throw new InternalError({message: 'It went bad!', data: 42, title: 'public message'});
      }
      doSomethingBad2();
    } catch (err) {
      expect(err.name).to.equal('InternalError');
      expect(err instanceof InternalError).to.be.true;
      expect(err instanceof Error).to.be.true;
      expect(util.isError(err)).to.be.true;
      expect(err.stack).to.exist;
      expect(err.toString()).to.equals('InternalError: It went bad!');
      expect(err.stack.split('\n')[0]).to.equal('InternalError: It went bad!');
      expect(err.stack.split('\n')[1].indexOf('doSomethingBad2')).to.equal(7);
      expect(err.data).to.equal(42);
      expect(err.title).to.equal('public message');
    }
  });
  it('should throw ValidationError', () => {
    try {
      function doSomethingBad() {
        throw new ValidationError({message: 'It went bad!', data: {test: 'data'}, title: 'my message'});
      }
      doSomethingBad();
    } catch (err) {
      expect(err.name).to.equal('ValidationError');
      expect(err instanceof ValidationError).to.be.true;
      expect(err instanceof Error).to.be.true;
      expect(util.isError(err)).to.be.true;
      expect(err.stack).to.exist;
      expect(err.toString()).to.equals('ValidationError: It went bad!');
      expect(err.stack.split('\n')[0]).to.equal('ValidationError: It went bad!');
      expect(err.stack.split('\n')[1].indexOf('doSomethingBad')).to.equal(7);
      expect(err.data).to.deep.equal({test: 'data'});
      expect(err.title).to.equal('my message');
    }
  });
});
