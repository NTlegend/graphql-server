const { Command } = require('@adonisjs/ace');

const Logger = use('Logger');

const Database = use('Database');
const User = use('App/Models/User');

/**
 * MakeRepository command class
 *
 * @author     Maxim Lukianenko <mlukianenko@mindk.com>
 * @copyright  Copyright (c) 2010-2018 MindK (http://mindk.com). All rights reserved.
 * @license    http://mindk.com
 * @link       http://mindk.com
 */
class UpdateUser extends Command {
    static get signature() {
        return `
    upd:user
    `;
    }

    static get description() {
        return 'Update password for user';
    }

    async handle() {
        try {
            const user = await User.find(await this.ask('Enter user ID:'));
            user.password = await this.ask('Enter new password for user:');
            await user.save();
        } catch (error) {
            Logger.error(error);
        }

        await Database.close();
    }
}

module.exports = UpdateUser;
