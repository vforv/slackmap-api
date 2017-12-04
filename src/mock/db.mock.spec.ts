import {mockIocFactory} from './mock-ioc';
import {DB_MOCK} from './db.mock';
import {expect} from '../testing';

describe('db.mock', () => {
  it('sholud initialize itself', () => {
    expect(() => mockIocFactory().get(DB_MOCK)).to.not.throw();
  });
  it('sholud write some data', () => {
    const db: Lowdb.Lowdb = mockIocFactory().get(DB_MOCK);
    db.set('test', true).write();
    expect(db.get('test').value()).to.equal(true);
  });
  it('sholud remove some data', () => {
    const db: Lowdb.Lowdb = mockIocFactory().get(DB_MOCK);
    db.set('test', true).write();
    db.unset('test').write();
    expect(db.get('test').value()).to.be.undefined;
  });
});
