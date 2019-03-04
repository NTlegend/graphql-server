/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Comment extends Model {
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
        return this.hasMany('App/Models/CommentLike');
    }

    groupedLikes() {
        return this.likes()
            .select('type')
            .groupBy('type');
    }

    comments() {
        return this.hasMany('App/Models/Comment', 'id', 'parent');
    }
}

module.exports = Comment;
