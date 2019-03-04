/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Post extends Model {
    static get updatedAtColumn() {
        return null;
    }

    static castDates(field, value) {
        return value.valueOf();
    }

    user() {
        return this.belongsTo('App/Models/User');
    }

    likes() {
        return this.hasMany('App/Models/PostLike');
    }

    comments() {
        return this.hasMany('App/Models/Comment');
    }
}

module.exports = Post;
