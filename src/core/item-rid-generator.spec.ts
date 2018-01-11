// console.log('NODE_PATH', process.env.NODE_PATH);

import {expect} from '@slackmap/testing';
import {itemRidGenerator, countryRidGenerator, photoRidGenerator} from './item-rid-generator';
import {ItemType} from './item';

describe('core/item-rid-generator.ts', () => {
  describe('itemRidGenerator(ItemType)', () => {
    it('should generate spot rid type', () => {
      expect(itemRidGenerator(ItemType.SPOT)).to.be.a('string');
      expect(itemRidGenerator(ItemType.SPOT).substr(0, 2)).to.equal('s0');
    });

    it('should generate video rid type', () => {
      expect(itemRidGenerator(ItemType.VIDEO)).to.be.a('string');
      expect(itemRidGenerator(ItemType.VIDEO).substr(0, 2)).to.equal('v0');
    });

    it('should throw error for location rid generation', () => {
      expect(() => itemRidGenerator(ItemType.LOCATION)).to.throw(Error);
    });
  });
  describe('countryRidGenerator(code, name)', () => {
    it('should generate rid for poland', () => {
      expect(countryRidGenerator('PL', 'Poland')).to.eql('l2-pl-poland');
    });

    it('should throw error when no code provided', () => {
      expect(() => countryRidGenerator('', 'Poland')).to.throw(Error);
    });

    it('should throw error when no name provided', () => {
      expect(() => countryRidGenerator('PL', '')).to.throw(Error);
    });
  });
  describe('photoRidGenerator(fileName)', () => {
    it('should generate rid for filename', () => {
      const rid = photoRidGenerator('jakos-gdzies-cos.jpg');
      expect(rid).to.be.a('string');
      expect(rid.substr(rid.length - 4)).to.equal('.jpg');
      expect(rid.substr(0, 2)).to.equal('p0');
    });
  });
});
