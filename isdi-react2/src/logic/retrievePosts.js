import { validateId, validateCallback } from './helpers/validators'
import { findUserById, loadPosts, loadUsers } from '../data'

export default function retrievePosts(userId, callback) {
    validateId(userId, 'user id')
    validateCallback(callback)

    findUserById(userId, (user) => {
        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        loadPosts((posts) => {
            loadUsers((users) => {
                posts.forEach((post) => {
                    post.fav =
                        Array.isArray(user.favs) && user.favs.includes(post.id)

                    const _user = users.find((user) => user.id === post.author)

                    post.author = {
                        id: _user.id,
                        name: _user.name,
                        avatar: _user.avatar,
                    }

                    callback(null, posts.toReversed())
                })
            })
        })
    })
}
