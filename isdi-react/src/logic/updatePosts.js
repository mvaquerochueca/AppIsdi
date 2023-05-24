import { validateId, validateUrl, validateText } from './helpers/validators'
import { findUserById, findPostById } from './helpers/data-managers'
import { savePost } from '../data'
import { posts } from '../data'

export default function updatePost(userId, postId, image, text) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text, 'text')

    const user = findUserById(userId)

    if (!user) throw new Error(`user with id ${userId} does not exist`)

    const post = findPostById(postId)

    if (!post) throw new Error(`post with id ${postId} does not exist`)

    if (post.author !== userId)
        throw new Error(
            `user with id ${userId} is not the author of post with id ${postId}`
        )

    //modify post with new data
    post.image = image
    post.text = text
    post.date = new Date()
    savePost(post)
}

//TODO delete post with id
