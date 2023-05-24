import { validateUrl, validateId } from './helpers/validators'
import { findUserById } from './helpers/data-managers'
import { saveUser } from '../data'

export default function updateUserAvatar(userId, avatar) {
    validateId(userId, 'user Id')
    validateUrl(avatar, 'avatar Url')

    const user = findUserById(userId)

    if (!user) throw new Error('user not found')

    user.avatar = avatar

    saveUser(user)
}
