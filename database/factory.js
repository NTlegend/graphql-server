/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', async faker => ({
    username: faker.username(10),
    email: faker.email({ domain: 'not.exists' }),
    password: faker.password(8)
}));
