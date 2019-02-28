const User = use('App/Models/User');
const Post = use('App/Models/Post');
const Factory = use('Factory');

class DataSeeder {
    async run() {
        await Post.query().delete();

        const { rows: users } = await User.query().fetch();
        const ids = users.map(({ id }) => id);
        const posts = (await Promise.all(ids.map(id => Factory.model('App/Models/Post').createMany(Math.round(Math.random() * 7) + 1, { user_id: id })))).reduce((a, b) =>
            a.concat(b)
        );

        await Promise.all(posts.map(({ id }) => Factory.model('App/Models/PostLike').createMany(Math.round(Math.random() * 7) + 1, { post_id: id, ids })));

        const comments = (await Promise.all(
            posts.map(({ id }) => Factory.model('App/Models/Comment').createMany(Math.round(Math.random() * 20) + 1, { post_id: id, ids }))
        )).reduce((a, b) => a.concat(b));

        const innerCommentsL1 = await Factory.model('App/Models/Comment').createMany(Math.round(Math.random() * 0.75 * comments.length) + 1, { comments, ids });
        const innerCommentsL2 = await Factory.model('App/Models/Comment').createMany(Math.round(Math.random() * 0.75 * innerCommentsL1.length) + 1, {
            comments: innerCommentsL1,
            ids
        });

        await Promise.all(
            [...comments, ...innerCommentsL1, ...innerCommentsL2].map(({ id }) =>
                Factory.model('App/Models/CommentLike').createMany(Math.round(Math.random() * 7) + 1, { comment_id: id, ids })
            )
        );
    }
}

module.exports = DataSeeder;
