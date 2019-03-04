const Comment = use('App/Models/Comment');
const Post = use('App/Models/Post');

module.exports = {
    Mutation: {
        // Add a new post
        async addComment(_, { post_id: postId, message }, { auth }) {
            try {
                // Check if user is logged in
                await auth.check();

                // Get the authenticated user
                const post = await Post.find(postId);
                // Get the authenticated user
                const user = await auth.getUser();

                // Add new comment for post
                return post.comments().create({
                    user_id: user.id,
                    message
                });
            } catch (error) {
                // Throw error if user is not authenticated
                throw new Error('Missing or invalid jwt token');
            }
        }
    },

    Comment: {
        async author(commentInJson) {
            const comment = new Comment();
            comment.newUp(commentInJson);

            const user = await comment.user().fetch();
            return user.toJSON();
        },

        async likes(commentInJson) {
            const comment = new Comment();
            comment.newUp(commentInJson);

            return comment.groupedLikes().count();
        },

        async comments(commentInJson) {
            const comment = new Comment();
            comment.newUp(commentInJson);

            const comments = await comment.comments().fetch();
            return comments.toJSON();
        }
    }
};
