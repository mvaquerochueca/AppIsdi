import { validateId } from './helpers/validators'
import { findUserById } from './helpers/data-managers'

export default function retrieveUser(userId) {
    validateId(userId, 'user Id')

    let user = findUserById(userId)

    if (!user) throw new Error('user not found')

    user = {
        name: user.name,
        avatar: user.avatar,
    }

    if (user.avatar) user.avatar = user.avatar

    return user
}
