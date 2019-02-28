const User = use('App/Models/User');
const Factory = use('Factory');

class UserSeeder {
    async run() {
        await User.query().delete();
        await Factory.model('App/Models/User').createMany(5);
    }
}

module.exports = UserSeeder;
