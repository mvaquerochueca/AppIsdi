import { validateId, validateUrl, validateText } from './helpers/validators'
import { findUserById, findUserByName } from './helpers/data-managers'
import { users, posts, savePosts } from '../data'

export default function createPost(userId, image, text) {
    validateId(userId, 'userId'),
        validateUrl(image, 'image'),
        validateText(text)

    const user = findUserById(userId)
    const _name = findUserByName(name)
    if (!user) throw new Error(`user with id ${userId} does not exist`)

    let id = 'post-1'
    const _posts = posts()

    const lastPost = _posts[_posts.length - 1]

    if (lastPost) {
        id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)
    }

    const post = {
        id,
        author: userId,
        image: image,

        text,
        date: new Date(),
    }

    _posts.push(post)
    savePosts(_posts)
}
