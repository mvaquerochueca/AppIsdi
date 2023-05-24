import { context } from '../ui'
import './Post.css'
import toggleLikePost from '../logic/toggleLikePost'
import deletePost from '../logic/deletePost'
import retrieveUser from '../logic/retrieveUser'
export default function Post({
    post: { id, image, text, date, likes, author, name },
    onEditPost,
    onToggledLikePost,
    onPostDeleted,
}) {
    console.log('Post -> render')

    const nameCreatorPost = retrieveUser(author).name

    const authorAvatar = retrieveUser(author).avatar

    const handleEditPost = () => onEditPost(id)

    const handleToggleLikePost = () => {
        try {
            toggleLikePost(context.userId, id)
            onToggledLikePost()
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDeletePost = () => {
        try {
            deletePost(context.userId, id)

            onPostDeleted()
        } catch (error) {
            alert(error.message)
        }
    }

    const options = {
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
    }
    const formattedDate = date.toLocaleDateString('en-EN', options)

    const limitText = (text) => {
        if (text.length > 50) {
            return text.slice(0, 50) + '...'
        } else {
            return text
        }
    }

    const textPost = limitText(text)

    return (
        <article style={{ backgroundImage: `url(${image})` }}>
            <div className="authorImageTime">
                <div className="authorAndAvatar">
                    <img className="avatarUserOnPost" src={authorAvatar} />
                    <p className="nameAuthor"> {nameCreatorPost}</p>
                </div>
                <div className="imageDate">
                    {/* <img src={image} /> */}
                    <time className="timePost">{formattedDate}</time>
                </div>
            </div>

            <div className="infoPost">
                <p className="textPost">{textPost}</p>
            </div>

            <div className="postButtons">
                {author === context.userId && (
                    <button onClick={handleEditPost}>📝</button>
                )}
                <button>⭐️</button>
                {author === context.userId && (
                    <button onClick={handleDeletePost}>🗑️</button>
                )}
                <button onClick={handleToggleLikePost}>
                    {likes && likes.includes(context.userId) ? '❤️' : '🤍'}
                </button>
                <div className="avatarLikes">
                    <p> Likes: </p>
                    {likes &&
                        likes.map((like) => (
                            <img
                                key={like}
                                className="avatarLike"
                                src={retrieveUser(like).avatar}
                            />
                        ))}
                    {likes && likes.length > 3 && (
                        <p className="likesNumber">+{likes.length - 3}</p>
                    )}
                </div>
            </div>
        </article>
    )
}