import {expect} from '@slackmap/testing';

import {ItemType, rid2type, ItemSubtype, SpotAccess, PhotoSize, DislikeReason, ItemRidPrefix, parseRid, SpotSubtype} from './item';

describe('core/item.ts', () => {
  describe('rid2type(rid:string)', () => {
    it('should return spot type', () => {
      expect(rid2type('s024fggdhdghgh')).to.equal(ItemType.SPOT);
    });
    it('should return photo type', () => {
      expect(rid2type('p0bmku6rdf')).to.equal(ItemType.PHOTO);
    });
    it('should return video type', () => {
      expect(rid2type('v0nhfdx')).to.equal(ItemType.VIDEO);
    });
    it('should return null', () => {
      expect(rid2type('poland')).to.be.an('null');
    });
  });
  describe('ItemType', () => {
    it('should return spot type', () => {
      expect(ItemType.SPOT).to.equal(1);
    });
  });
  describe('SpotSubtype', () => {
    it('should return spot highline subtype', () => {
      expect(SpotSubtype.HIGHLINE).to.equal(1);
    });
  });
  describe('SpotAccess', () => {
    it('should return open access', () => {
      expect(SpotAccess.OPEN).to.equal(1);
    });
  });
  describe('PhotoSize', () => {
    it('should return XS_S photo size', () => {
      expect(PhotoSize.XS_S).to.equal(1);
    });
  });
  describe('DislikeReason', () => {
    it('should return DOES_NOT_EXISTS reason', () => {
      expect(DislikeReason.DOES_NOT_EXISTS).to.equal(1);
    });
  });

  describe('ItemRidPrefix', () => {
    it('should return ItemType.CONTENT for c0 prefix', () => {
      expect(ItemRidPrefix.c).to.equal(ItemType.CONTENT);
    });
  });

  /**
   * parseRid()
   */
  describe('parseRid(rid)', () => {
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
    it('should return valid for valid rid, even if the end is old', () => {
      const res = parseRid('s0fgrtyjyurtg0s');
      expect(res)
        .to.have.property('valid')
        .and.equal(true);
      expect(res)
        .to.have.property('rid')
        .and.equal('s0fgrtyjyurtg0s');
      expect(res)
        .to.have.property('type')
        .and.equal(ItemType.SPOT);
    });
    it('should return valid for valid rid', () => {
      const res = parseRid('v0fgrtyjyurtg');
      expect(res)
        .to.have.property('valid')
        .and.equal(true);
      expect(res)
        .to.have.property('rid')
        .and.equal('v0fgrtyjyurtg');
      expect(res)
        .to.have.property('type')
        .and.equal(ItemType.VIDEO);
    });
    it('should return invalid for old rids, and should return new rid', () => {
      const res = parseRid('fgrtyjyurtg0s');
      expect(res)
        .to.have.property('valid')
        .and.equal(false);
      expect(res).to.not.have.property('rid');
      expect(res).to.not.have.property('type');
    });
    it('should return invalid for old rids, with invalid type', () => {
      const res = parseRid('fgrtyjyurtg0q');
      expect(res)
        .to.have.property('valid')
        .and.equal(false);
      expect(res).to.not.have.property('rid');
    });
    it('should return invalid for valid rids, with invalid type', () => {
      const res = parseRid('q0fgrtyjyurtg0q');
      expect(res)
        .to.have.property('valid')
        .and.equal(false);
      expect(res).to.not.have.property('rid');
    });
  });
});
