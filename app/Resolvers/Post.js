const Post = use('App/Models/Post');

module.exports = {
    Query: {
        // Fetch all posts
        async allPosts() {
            const posts = await Post.all();
            return posts.toJSON();
        },
        // Get a post by its ID
        async fetchPost(_, { id }) {
            const post = await Post.find(id);
            return post.toJSON();
        }
    },

    Mutation: {},

    Post: {
        // Fetch the author of a particular post
        async user(postInJson) {
            // Convert JSON to model instance
            const post = new Post();
            post.newUp(postInJson);

            const user = await post.user().fetch();
            return user.toJSON();
        }
    }
};
