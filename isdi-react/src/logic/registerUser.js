//Register a user in database
// @param {string} username
// @param {string} email
// @param {string} password

import {
    validateName,
    validateEmail,
    validatePasswordRegister,
    validateCallback,
} from './helpers/validators'
import { saveUsers, findUserByEmail, loadUsers } from '../data'

export default function registerUser(name, email, password, callback) {
    validateName(name)
    validateEmail(email)
    validatePasswordRegister(password)
    validateCallback(callback)

    findUserByEmail(email, (foundUser) => {
        if (foundUser) {
            callback(new Error('User already exists'))

            return
        }

        let id = 'user-1'

        loadUsers((users) => {
            const lastUser = users[users.length - 1]

            if (lastUser) id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

            const user = {
                id,
                name,
                email,
                password,
                favs: [],
                // avatar: DEFAULT_AVATAR,
            }

            users.push(user)

            saveUsers(users, () => callback(null))
        })
    })
}
