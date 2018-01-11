import {DbMock, dbMockFactory, Lowdb} from './db.mock';
import {DbCollections} from '@slackmap/data-fixtures';
import {expect} from '@slackmap/testing';

describe('db.mock', () => {
  let db: Lowdb;

  beforeEach(() => {
    db = dbMockFactory();
  });

  it('sholud initialize itself', () => {
    expect(() => dbMockFactory()).to.not.throw();
  });

  it('sholud have fixtures data', () => {
    const tokens = db.get(DbCollections.USERS).value();
    expect(tokens).to.be.an('array');
  });

  it('sholud have USER fixtures', () => {
    const user: any = db
      .get(DbCollections.USERS)
      .find({facebook_id: '1234567890'})
      .value();
    expect(user).to.have.any.keys('rid');
    expect(user.rid).to.equal('u0test');
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
