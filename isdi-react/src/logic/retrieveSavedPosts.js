//Logica de recuperacion de posts guardados para cada usuario
import { validateId } from './helpers/validators'
import { users } from '../data'
import { findPostById } from './helpers/data-managers'

export default function retrieveSavedPosts(userId, postId) {
    validateId(userId, 'User id')
    validateId(postId, 'Post id')

    const found = users().some((user) => user.id === userId)

    if (!found) throw new Error(`user with id ${userId} not found`)

    const savedPost = findPostById(postId)

    if (!savedPost) throw new Error(`post with id ${postId} not found`)

    return savedPost
}
