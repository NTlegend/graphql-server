/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CommentLikeSchema extends Schema {
    up() {
        this.create('comment_likes', table => {
            table.increments();
            table
                .integer('comment_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('comments')
                .onDelete('cascade');
            table
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('cascade');
            table.string('type', 10).index();
        });
    }

    down() {
        this.drop('comment_likes');
    }
}

module.exports = CommentLikeSchema;
