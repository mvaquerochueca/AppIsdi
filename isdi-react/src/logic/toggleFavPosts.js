import { validateId, validateCallback } from './helpers/validators'
import { saveUser, findUserById, findPostById } from '../data'

export default function toggleFavPost(userId, postId, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback)

    findUserById(userId, (user) => {
        if (!user) {
            callback(new Error(`User with id ${userId} not found`))

            return
        }

        findPostById(postId, (post) => {
            if (!post) {
                callback(new Error(`Post with id ${postId} not found`))

                return
            }

            const index = user.favs.indexOf(postId)

            if (index < 0) user.favs.push(postId)
            else user.favs.splice(index, 1)

            saveUser(user, () => callback(null))
        })
    })
}
