/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class CommentLike extends Model {
    static get TYPES() {
        return {
            LIKE: 'like',
            SMILE: 'smile',
            DIRTY: 'dirty'
        };
    }

    static get createdAtColumn() {
        return null;
    }

    static get updatedAtColumn() {
        return null;
    }
}

module.exports = CommentLike;
