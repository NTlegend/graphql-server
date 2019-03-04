const Comment = use('App/Models/Comment');

module.exports = {
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
