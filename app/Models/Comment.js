/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Comment extends Model {
    static get updatedAtColumn() {
        return null;
    }

    likes() {
        return this.hasMany('App/Models/CommentLike');
    }

    comments() {
        return this.hasMany('App/Models/Comment');
    }
}

module.exports = Comment;
