import { convertMeasure } from './convert-measure';
import {ItemType, SpotAccess, SpotCategory, SpotSubtype} from "./item";

var _ = require('lodash');

export class ItemBase {

    public rids = [
        {id: 's0', name: 'spot'},
        {id: 'u0', name: 'user'},
        {id: 'p0', name: 'photo'},
        {id: 'v0', name: 'video'},
        {id: 'c0', name: 'content'},
        {id: 'o0', name: 'comment'},
        {id: 'm0', name: 'map'},
        {id: 't0', name: 'post'},
    ];
    public types = [
        // {id: 1, name: 'line', label: 'Line'},
        // {id: 2, name: 'area', label: 'Area'},
        {id: 1, name: 'spot', label: 'Spot'},
        {id: 4, name: 'user', label: 'User'},
        {id: 5, name: 'photo', label: 'Photo'},
        {id: 6, name: 'video', label: 'Video'},
        {id: 7, name: 'location', label: 'Location'},
        {id: 8, name: 'content', label: 'Content'},
        {id: 9, name: 'rig', label: 'Rig'},
        {id: 10, name: 'cluster', label: 'Cluster'},
        {id: 11, name: 'map', label: 'Map'},
        {id: 12, name: 'comment', label: 'Comment'},
        {id: 13, name: 'post', label: 'Post'},
    ];
    public subtypes = [
        {id: SpotSubtype.HIGHLINE,  type: ItemType.SPOT, category: SpotCategory.LINE, name: 'highline', label: 'Highline', color:'#DD6363', option_order: 2},
        {id: SpotSubtype.MIDLINE,   type: ItemType.SPOT, category: SpotCategory.LINE, name: 'midline', label: 'Midline', color:'#dc9e67', option_order: 3},
        {id: SpotSubtype.LONGLINE,  type: ItemType.SPOT, category: SpotCategory.LINE, name: 'longline', label: 'Longline', color:'#DEDE6E', option_order: 4},
        {id: SpotSubtype.WATERLINE, type: ItemType.SPOT, category: SpotCategory.LINE, name: 'waterline', label: 'Waterline', color:'#8F8EFF', option_order: 5},
        {id: SpotSubtype.RODEOLINE, type: ItemType.SPOT, category: SpotCategory.LINE, name: 'rodeoline', label: 'Rodeoline', color:'#E787FE', option_order: 6},
        {id: SpotSubtype.SLACKLINE, type: ItemType.SPOT, category: SpotCategory.LINE, name: 'slackline', label: 'Simple Line', color:'#BCBCBC', option_order: 1},
        {id: SpotSubtype.TRICKLINE, type: ItemType.SPOT, category: SpotCategory.LINE, name: 'trickline', label: 'Trickline', color:'#000000', option_order: 7},
        {id: SpotSubtype.SPACELINE, type: ItemType.SPOT, category: SpotCategory.LINE, name: 'spaceline', label: 'Spaceline', color:'#7de5dc'},

        {id: SpotSubtype.AREA,      type: ItemType.SPOT, category: SpotCategory.AREA, name: 'area', label: 'Slack Area', color:'#BCBCBC', option_order: 1},
        {id: SpotSubtype.PARK,      type: ItemType.SPOT, category: SpotCategory.AREA, name: 'park', label: 'Park',       color:'#BCBCBC', option_order: 2},
        {id: SpotSubtype.MOUNTAIN,  type: ItemType.SPOT, category: SpotCategory.AREA, name: 'mountain', label: 'Mountain', color:'#BCBCBC', option_order: 3},
        {id: SpotSubtype.GYM,       type: ItemType.SPOT, category: SpotCategory.AREA, name: 'gym', label: 'Gym',         color:'#BCBCBC', option_order: 4},
        {id: SpotSubtype.URBAN,     type: ItemType.SPOT, category: SpotCategory.AREA, name: 'urban', label: 'Urban',     color:'#BCBCBC', option_order: 5},

        // {id: 53, type: 1, name: 'waterline-area', label: 'Waterline Area', option_order: 0},
        // {id: 54, type: 1, name: 'highline-area', label: 'Highline Area', option_order: 0},


        {id: 100, type: 7, name: 'world', label: 'World'},
        {id: 101, type: 7, name: 'continent', label: 'Continent'},
        {id: 102, type: 7, name: 'country', label: 'Country'},
        {id: 103, type: 7, name: 'region', label: 'Region'},
        {id: 104, type: 7, name: 'city', label: 'City'},
        {id: 105, type: 7, name: 'district', label: 'District'},
        {id: 106, type: 7, name: 'street', label: 'Street'},

        {id: 110, type: 7, name: 'google', label: 'Google'},


        {id: 205, type: 8, name: 'access', label: 'Access', desc: 'describe any access issues, how to get permission...'},
        {id: 202, type: 8, name: 'description', label: 'Description', desc: 'general description'},
        {id: 203, type: 8, name: 'anchors', label: 'Anchors', desc: 'what type of anchors, what gear you need...'},
        {id: 204, type: 8, name: 'ascend', label: 'Ascend', desc: 'how to get to this spot and it\'s anchors...'},
        {id: 201, type: 8, name: 'notes', label: 'Notes', desc: 'extra stuff to keep in mind...'},

        {id: 300, type: 12, name: 'comment', label: 'Comment'},
        {id: 301, type: 12, name: 'reply', label: 'Reply'},

        {id: 400, type: 13, name: 'text', label: 'Text'},
        {id: 401, type: 13, name: 'user', label: 'User'},
        {id: 402, type: 13, name: 'spot', label: 'Spot'},
        {id: 403, type: 13, name: 'photo', label: 'Photo'},

    ];

    public access = [
        {id: SpotAccess.OPEN,       name: 'open',       label: 'Open',          cls: 'success'},
        {id: SpotAccess.RESTRICTED, name: 'restricted', label: 'Restricted',    cls: 'warning'},
        {id: SpotAccess.FORBIDDEN,  name: 'forbidden',  label: 'Forbidden',     cls: 'danger'},
        {id: SpotAccess.UNKNOWN,    name: 'unknown',    label: 'I don\'t know', cls: 'default'},
    ];

    public photoSizes = {
        xs_s: true,
        s_s: true,
        l: true
    };

    public photoPlaceholder = {
        xs_s: '/assets/images/image-placeholder-xs.jpg',
        s_s: '/assets/images/image-placeholder-xs.jpg',
        l: '/assets/images/image-placeholder-xs.jpg',
    };

    public dislikeReasons = {
        1: `does not exist`,
        2: `it's not helpful`,
        3: 'just don\'t'
    };

    constructor(protected config?) {}

    getSpotSubtypeOptions (category: SpotCategory) {
        var options = this.subtypes.filter((t:any)=>(t.type===ItemType.SPOT && t.option_order && t.category === category));
        return _.sortBy(options, (t)=>t.option_order);
    }
    getSpotAccessOptions () {
        return this.access
    }

    getType (item){
        var id;
        if(_.isNumber(item)) {
            id = item;
        } else if (_.isObject(item)) {
            id = item.type;
        }
        if(!id) {
            return {};
        }
        return _.find(this.types, {id: id})||{}
    }

    getSubtypes(type_id) {
        if(!parseInt(type_id)) {
            type_id = _.find(this.types, {name: type_id})||{};
            type_id = type_id.id;
        }
        return _.filter(this.subtypes, {type: type_id})||{}
    }

    getSubtype(item){
        try {
            var id;
            if(_.isNumber(item)) {
                id = item;
            } else if (_.isObject(item)) {
                id = item.subtype;
            }
            if(!id) {
                return {};
            }
            return _.find(this.subtypes, {id: id})||{}
        } catch (err) {
            return {}
        }

    }

    getAccess(item) {
        var id;
        if(_.isNumber(item)) {
            id = item;
        } else if (_.isObject(item)) {
            id = item.access;
        }
        if(!id) {
            return {};
        }
        return _.find(this.access, {id: id})||{}
    }

    getQrcodeUrl(item) {
        if(item  && item.rid) {
            return `/api/v1/items/${item.rid}/qrcode`;
        }
    }

    getUrl(item){
        if(item && item.rid && this.config) {
            return this.config.domain+'/x/'+item.rid;
        }
    }
    getNavigateUrl(item){
        if(item && item.coordinates) {
            let lon = item.coordinates.coordinates[0];
            let lat = item.coordinates.coordinates[1];
            return `http://maps.google.com/maps?q=loc:${lat},${lon}`;
        }
    }
    get3dUrl(item){
        if(item && item.coordinates) {
            let lon = item.coordinates.coordinates[0];
            let lat = item.coordinates.coordinates[1];
            // return `http://www.google.com/maps/place/52.440406799316406,21.099708557128906/@52.440406799316406,21.099708557128906,150a,35y,10t/data=!3m1!1e3!4m5!3m4!1s0x0:0x0!8m2!3d52.4404068!4d21.0997086`;
            // return `http://www.google.com/maps/place/${lat},${lon}/@${lat},${lon},0a,35y,39.25t/data=!3m1!1e3!4m5!3m4!1s0x0:0x0!8m2!3d52.4404068!4d21.0997086`;
            return `http://maps.google.com/maps?&t=k&q=${lat}+${lon}`;
        }
    }
               // https://www.google.com/maps/place/52%C2%B026'25.5%22N+21%C2%B005'59.0%22E/@52.4404068,21.0975199,559m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d52.4404068!4d21.0997086
    // https://www.google.com/maps/place/52%C2%B026'25.5%22N+21%C2%B005'59.0%22E/@52.4353649,21.0975199,686a,35y,39.25t/data=!3m1!1e3!4m5!3m4!1s0x0:0x0!8m2!3d52.4404068!4d21.0997086

    getPhotoUrl(item, size) {

        if(!item) {
            item = {};
        }

        if(item.type == 7) {
            // google search result
            if(item.subtype == 110) {
                return `/assets/images/google.png`;
            }
            // country
            var sizes = {
                '16':true,
                '24':true,
                '48':true,
                '64':true,
                '1600':true
            }
            if(!sizes[size]){
                size = 24;
            }
            if(item.rid) {
                let code = item.rid.substr(3, 2).toLocaleLowerCase();
                return `/assets/uploads/flag-icon-css/flags/4x3/${code}.svg`;
            }
        } else if(!this.photoSizes[size]) {
            size = 'xs_s';
        }

        if(item.photo_src) {
            return `/assets/uploads/p0/${size}/${item.photo_src}`;
        }

        if(item.photos && item.photos[0]) {
            return `/assets/uploads/p0/${size}/${item.photos[0]}`;
        }

        if(typeof item === 'string') {
            return `/assets/uploads/p0/${size}/${item}`;
        }

        if(item.facebook_id) {
            return 'https://graph.facebook.com/'+item.facebook_id+'/picture?type=square';
        }

        if(item.rid) {
            return `/assets/uploads/p0/${size}/${item.rid}`;
        }

        //if(item.user_facebook_id) {
        //    return 'https://graph.facebook.com/'+item.user_facebook_id+'/picture?type=square';
        //}
        return this.photoPlaceholder.s_s;
    }

    getTitle(item, noName = false) {

        if(!item) return '';

        var type = this.getType(item);
        var subtype = this.getSubtype(item);

        var name = '';
        if(item.name && !noName){
            name = this.toTitleCase(item.name);
        }
        var title = name;

        /**
         * USER
         */
        if(type.name == 'user'){
            //leave the name
        }

        /**
         * LOCATION
         */
        else if(type.name == 'location') {

            if(subtype.name == 'world'){
                title = `The World of Slacklining`;
            }

            // google geocode result
            else if(subtype.name == 'google'){
                title = `${name} from google`;
            }

            // country, contintent, region, street, city, district
            else if(subtype.name == 'country') {
                title = `${name}`;
            }
        }

        /**
         * SPOT
         */
        else if(type.name == 'spot') {
            // slack area
            if(item.subtype >= 50) {
                var access = this.getAccess(item);
                var label = access.label;
                if(access.name == 'unknown') {
                    label = '';
                }
                title = `${label||''} ${subtype.label||'Slack Area'} ${name} `;
            }

            // line
            else if(item.subtype < 50) {
                title = `${this.getLength(item, true)} ${subtype.label} ${name}`;
            }
        }

        return title;
    }

    getTitleHtml(item, noName?) {
        if(!item) return '';

        var type = this.getType(item);
        var subtype = this.getSubtype(item);
        var name = '';

        if(item && item.name && !noName){
            name = `<span class="name"><i>„</i>${this.toTitleCase(item.name)}<i>”</i></span> `;
        }
        var title = name;

        /**
         * USER
         */
        if(type.name == 'user'){
            title = '<span class="name">'+item.name+'</span>';
        }

        /**
         * LOCATION
         */

        else if(type.name == 'location') {

            if(subtype.name == 'world'){
                title = `<span class="name">open slackline database</span>`;
            }

            // google geocode result
            else if(subtype.name == 'google'){
                title = `<span class="name google-name">${item.name}</span> <i class="google-label">from google</i>`;
            }

            // country, contintent, region, street, city, district
            else if(subtype.name == 'country') {
                title = `${name}`;
            }
        }

        /**
         * SPOT
         */
        else if(type.name == 'spot') {
            // slack area
            if(item.subtype >= 50) {
                var access = this.getAccess(item);
                var label = access.label;
                if(access.name == 'unknown') {
                    label = '';
                }
                title = `<span class="access access-${access.name}">${label||''}</span> <span class="type">${subtype.label||'Slack Area'}</span> ${name} `;
            }

            // line
            else if(item.subtype < 50) {
                title = `<span class="length item-${subtype.name}">${this.getLength(item)}</span> <span class="type">${subtype.label||'Line Spot'}</span> ${name}`;
            }
        }

        return title;
    }

    getLength(item, noHtml=false) {
        if(noHtml) {
            return Math.round(item.length)+'m/'+Math.round(convertMeasure(item.length,'m', 'f'))+'ft';
        } else {
            return Math.round(item.length)+'<i>m</i><b>/</b>'+Math.round(convertMeasure(item.length, 'm', 'f'))+'<i>ft</i>';
        }
    }

    getIconClass(item) {
        if(typeof item == 'number') {
            item = {subtype: item};
        }
        return  'icon-item icon-'+this.getSubtype(item).name;
    }

    toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
};