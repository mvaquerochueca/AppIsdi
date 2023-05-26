import {
    validateName,
    validateEmail,
    validatePasswordRegister,
} from './helpers/validators'
import { findUserByEmail } from './helpers/data-managers'
import { users, saveUsers } from '../data'

export default function registerUser(name, email, password) {
    validateName(name)
    validateEmail(email)
    validatePasswordRegister(password)

    const foundUser = findUserByEmail(email)

    if (foundUser) throw new Error('user already exists')

    const _users = users()
    const lastUser = _users[_users.length - 1]

    let id = 'user-1'

    if (lastUser) {
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)
    }

    const user = {
        id,
        name,
        email,
        password,
        savedPosts: [],
    }
    _users.push(user)
    saveUsers(_users)
}
