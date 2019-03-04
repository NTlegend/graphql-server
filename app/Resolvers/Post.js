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

    Mutation: {
        // Add a new post
        async addPost(_, { message }, { auth }) {
            try {
                // Check if user is logged in
                await auth.check();

                // Get the authenticated user
                const user = await auth.getUser();

                // Add new post for current user
                return user.posts().create({ message });
            } catch (error) {
                // Throw error if user is not authenticated
                throw new Error('Missing or invalid jwt token');
            }
        }
    },

    Post: {
        // Fetch the author of a particular post
        async author(postInJson) {
            // Convert JSON to model instance
            const post = new Post();
            post.newUp(postInJson);

            const user = await post.user().fetch();
            return user.toJSON();
        },

        async likes(postInJson) {
            // Convert JSON to model instance
            const post = new Post();
            post.newUp(postInJson);

            return post.groupedLikes().count();
        },

        async comments(postInJson) {
            const post = new Post();
            post.newUp(postInJson);

            const comments = await post.comments().fetch();
            return comments.toJSON();
        }
    }
};
