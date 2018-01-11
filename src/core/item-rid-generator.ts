import {ItemType, ItemRidPrefix, LocationSubtype} from './item';
import * as path from 'path';
import * as randomstring from 'randomstring';
import * as crypto from 'crypto';
import * as getSlug from 'speakingurl';

export function itemRidGenerator(type: ItemType): string {
  if (type === ItemType.LOCATION) {
    throw new Error('not suported type: for ItemType.LOCATION you have to use locationRidGeneraotr()');
  }
  if (type === ItemType.PHOTO) {
    throw new Error('not suported type: for ItemType.PHOTO you have to use photoRidGenerator()');
  }
  return ItemRidPrefix[type] + '0' + randomstring.generate(11);
}

export function photoRidGenerator(fileName: string): string {
  if (!fileName) {
    throw new Error('file name for photo rid generation is required');
  }
  const ext = path.extname(fileName);
  if (!ext) {
    throw new Error('file extension for photo rid generation is required');
  }

  const name = crypto
    .createHash('sha1')
    .update(fileName + Date.now())
    .digest('hex');

  return '' + ItemRidPrefix[ItemType.PHOTO] + '0' + name + ext.toLowerCase();
}

export function countryRidGenerator(code: string, name: string): string {
  if (!code) {
    throw new Error('country code for rid generation is required');
  }
  if (!name) {
    throw new Error('country name for rid generation is required');
  }
  return '' + ItemRidPrefix[ItemType.LOCATION] + (LocationSubtype.COUNTRY - 100) + '-' + code.toLowerCase() + '-' + getSlug(name);
}
