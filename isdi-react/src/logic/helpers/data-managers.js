import { users, posts } from '../../data'

export function findUserByEmail(email) {
    return users().find((user) => user.email === email)
}

export function findUserByName(name) {
    return users().find((user) => user.name === name)
}

export function findUserById(userId) {
    return users().find((user) => user.id === userId)
}

export function findPostById(postId) {
    return posts().find((post) => post.id === postId)
}
