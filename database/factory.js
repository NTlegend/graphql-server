/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const PostLike = use('App/Models/PostLike');
const CommentLike = use('App/Models/CommentLike');

Factory.blueprint('App/Models/User', async faker => ({
    username: faker.username(10),
    email: faker.email({ domain: 'not.exists' }),
    password: faker.password(8)
}));

Factory.blueprint('App/Models/Post', async (faker, i, data) => ({
    user_id: data.user_id,
    message: faker.sentence({ words: Math.round(Math.random() * 10) + 1 })
}));

Factory.blueprint('App/Models/PostLike', async (faker, i, data) => ({
    user_id: faker.pickone(data.ids),
    post_id: data.post_id,
    type: faker.pickone(Object.values(PostLike.TYPES))
}));

Factory.blueprint('App/Models/Comment', async (faker, i, data) => {
    const comment = data.comments ? faker.pickone(data.comments) : { id: null, post_id: data.post_id };
    return {
        parent: comment.id,
        post_id: comment.post_id,
        user_id: faker.pickone(data.ids),
        message: faker.sentence({ words: Math.round(Math.random() * 10) + 1 })
    };
});

Factory.blueprint('App/Models/CommentLike', async (faker, i, data) => ({
    user_id: faker.pickone(data.ids),
    comment_id: data.comment_id,
    type: faker.pickone(Object.values(CommentLike.TYPES))
}));
