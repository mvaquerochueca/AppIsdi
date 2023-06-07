import { validateUrl, validateId, validateCallback } from './helpers/validators'
import { saveUser, findUserById } from '../data'

export default function updateUserAvatar(userId, avatar, callback) {
    validateId(userId, 'User id')
    validateUrl(avatar, 'Avatar url')
    validateCallback(callback)

    findUserById(userId, (user) => {
        if (!user) {
            callback(new Error('User not found'))

            return
        }

        user.avatar = avatar

        saveUser(user, () => callback(null))
    })
}
