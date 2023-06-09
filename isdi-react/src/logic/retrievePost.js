import { validateId, validateCallback } from './helpers/validators'
import { findUserById, findPostById } from '../data'

//Retrive a post from database
// @param {string} userId
// @param {string} postId

export default function retrievePost(userId, postId, callback) {
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

            callback(null, post)
        })
    })
}
