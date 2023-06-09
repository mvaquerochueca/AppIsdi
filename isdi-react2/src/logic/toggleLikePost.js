import { validateId, validateCallback } from './helpers/validators'
import { savePost, findUserById, findPostById } from '../data'

export default function toggleLikePost(userId, postId, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback)

    findUserById(userId, (user) => {
        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        findPostById(postId, (post) => {
            if (!post) {
                callback(new Error(`post with id ${postId} not found`))

                return
            }

            if (!post.likes) {
                post.likes = [userId]
            } else {
                const index = post.likes.indexOf(userId)

                if (index < 0) post.likes.push(userId)
                else {
                    post.likes.splice(index, 1)

                    if (!post.likes.length) delete post.likes
                }
            }

            savePost(post, () => callback(null))
        })
    })
}
