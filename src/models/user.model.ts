import { Item } from './item';

/**
 * User model definition
 */
export class UserModel extends Item {

    location?: string;
    id?: string;
    facebook_id?:string;
    email?: string;
    firstname?: string;
    lastname?: string;
    login_at?: string;

};