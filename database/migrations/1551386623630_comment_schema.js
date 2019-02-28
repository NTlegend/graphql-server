/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CommentSchema extends Schema {
    up() {
        this.create('comments', table => {
            table.increments();
            table
                .integer('post_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('posts')
                .onDelete('cascade');
            table
                .integer('parent')
                .unsigned()
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
            table.string('message').notNullable();
            table.timestamp('created_at').defaultTo(this.fn.now());
        });
    }

    down() {
        this.drop('comments');
    }
}

module.exports = CommentSchema;
