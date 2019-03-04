const User = use('App/Models/User');

module.exports = {
    Query: {
        // Fetch all users
        async allUsers() {
            const users = await User.all();
            return users.toJSON();
        },
        // Get a user by its ID
        async fetchUser(_, { id }) {
            const user = await User.find(id);
            return user.toJSON();
        }
    },

    Mutation: {
        // Handles user login
        async login(_, { email, password }, { auth }) {
            const { token } = await auth.attempt(email, password);
            return token;
        }
    },

    User: {
        // Fetch all posts created by a user
        async posts(userInJson) {
            // Convert JSON to model instance
            const user = new User();
            user.newUp(userInJson);

            const posts = await user.posts().fetch();
            return posts.toJSON();
        }
    }
};
