/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PostLikeSchema extends Schema {
    up() {
        this.create('post_likes', table => {
            table.increments();
            table
                .integer('post_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('posts')
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
        this.drop('post_likes');
    }
}

module.exports = PostLikeSchema;
