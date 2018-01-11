import {expect} from '@slackmap/testing';
import {ItemType, parseRid} from './item';
import {parseOldRid} from './parse-old-rid';

describe('core/parse-old-rid.ts', () => {
  /**
   * parseOldRid()
   */
  describe('parseOldRid(rid)', () => {
    it('should return invalid for empty value', () => {
      expect(parseRid(''))
        .to.have.property('valid')
        .and.equal(false);
    });
    it('should return invalid for numeric value', () => {
      expect(parseRid('44'))
        .to.have.property('valid')
        .and.equal(false);
    });

    it('should return valid for old rids, and should return new rid', () => {
      const res = parseOldRid('fgrtyjyurtg0s');
      expect(res)
        .to.have.property('valid')
        .and.equal(true);
      expect(res)
        .to.have.property('rid')
        .and.to.equal('s0fgrtyjyurtg');
      expect(res)
        .to.have.property('type')
        .and.equal(ItemType.SPOT);
    });
    it('should return invalid for old rids, for location', () => {
      const res = parseOldRid('fgrtyjyurtg0l');
      expect(res)
        .to.have.property('valid')
        .and.equal(false);
      expect(res).to.not.have.property('rid');
      expect(res).to.not.have.property('type');
    });
    it('should return valid for old location rid', () => {
      const res = parseOldRid('poland');
      expect(res)
        .to.have.property('valid')
        .and.equal(true);
      expect(res)
        .to.have.property('rid')
        .and.equal('l2-pl-poland');
      expect(res)
        .to.have.property('type')
        .and.equal(ItemType.LOCATION);
    });
    it('should return valid for old world rid', () => {
      const res = parseOldRid('world');
      expect(res)
        .to.have.property('valid')
        .and.equal(true);
      expect(res)
        .to.have.property('rid')
        .and.equal('l0-world');
      expect(res)
        .to.have.property('type')
        .and.equal(ItemType.LOCATION);
    });
  });
});
