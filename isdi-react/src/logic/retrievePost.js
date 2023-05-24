import { validateId } from './helpers/validators'
import { users } from '../data'
import { findPostById } from './helpers/data-managers'

export default function retrievePost(userId, postId) {
    validateId(userId, 'User id')
    validateId(postId, 'Post id')

    const found = users().some((user) => user.id === userId)

    if (!found) throw new Error(`user with id ${userId} not found`)

    const post = findPostById(postId)

    if (!post) throw new Error(`post with id ${postId} not found`)

    return post
}
