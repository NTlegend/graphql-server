/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PostSchema extends Schema {
    up() {
        this.create('posts', table => {
            table.increments();
            table
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users');
            table.string('message').notNullable();
            table.timestamp('created_at').defaultTo(this.fn.now());
        });
    }

    down() {
        this.drop('posts');
    }
}

module.exports = PostSchema;
