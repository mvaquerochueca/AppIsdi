import {
    validateId,
    validateUrl,
    validateText,
    validateCallback,
} from './helpers/validators'
import { savePost, findUserById, findPostById } from '../data'

export default function updatePost(userId, postId, image, text, callback) {
    validateId(userId, 'User id')
    validateId(postId, 'Post id')
    validateUrl(image, 'Image url')
    validateText(text)
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

            if (post.author !== userId) {
                callback(
                    new Error(
                        `Post with id ${postId} does not belong to user with id ${userId}`
                    )
                )

                return
            }

            post.image = image
            post.text = text
            post.date = new Date()

            savePost(post, () => callback(null))
        })
    })
}
