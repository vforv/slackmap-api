import {mockIocFactory} from './mock-ioc';
import {DB_MOCK, DbMock} from './db.mock';
import {expect} from '../testing';
import {Container} from 'inversify';
import {DbCollections} from './fixtures/db.fixture';

describe('db.mock', () => {
  let ioc: Container, db: DbMock;

  beforeEach(() => {
    ioc = mockIocFactory();
    db = ioc.get(DB_MOCK);
  });

  it('sholud initialize itself', () => {
    expect(() => ioc.get(DB_MOCK)).to.not.throw();
  });

  it('sholud have fixtures data', () => {
    const tokens = db.get(DbCollections.FB_TOKENS).value();
    expect(tokens).to.be.an('array');
  });

  it('sholud write some data', () => {
    db.set('test', true).write();
    expect(db.get('test').value()).to.equal(true);
  });

  it('sholud remove some data', () => {
    db.set('test', true).write();
    db.unset('test').write();
    expect(db.get('test').value()).to.be.undefined;
  });
});
