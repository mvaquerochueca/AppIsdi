import { context, DEFAULT_AVATAR } from '../ui'
import './Post.css'
import toggleLikePost from '../logic/toggleLikePost'
import toggleFavPost from '../logic/toggleFavPosts'
import deletePost from '../logic/deletePost'
// import Profile from './Profile'

export default function Post({
    post: { id, image, text, date, likes, author, fav },
    onEditPost,
    onToggledLikePost,
    onPostDeleted,
    onToggledSavePost,
    onGoToProfile,
}) {
    const handleEditPost = () => onEditPost(id)

    const handleToggleLikePost = () => {
        try {
            toggleLikePost(context.userId, id, (error) => {
                if (error) {
                    alert(error.message)
                }
                onToggledLikePost()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDeletePost = () => {
        try {
            deletePost(context.userId, id, (error) => {
                if (error) {
                    alert(error.message)

                    return
                }

                onPostDeleted()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleToggleSavePost = () => {
        try {
            toggleFavPost(context.userId, id, (error) => {
                if (error) {
                    alert(error.message)

                    return
                }

                onToggledSavePost()
            })
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

    const handleShowLikes = (likes) => {
        if (likes.length < 5) {
            return likes.map((like) => (
                <img
                    key={like}
                    className="avatarLike"
                    src={author.avatar ? author.avatar : DEFAULT_AVATAR}
                />
            ))
        } else {
            return <p className="likesNumber">+{likes.length}</p>
        }
    }

    const limitText = (text) => {
        if (text.length > 50) {
            return text.slice(0, 50) + '...'
        } else {
            return text
        }
    }

    const textPost = limitText(text)

    return (
        <div className="feed">
            <section className="username">
                <div className="image">
                    <a href="#">
                        {' '}
                        <img src={author.avatar} />
                    </a>
                </div>
                <div className="id">
                    <a href="" onClick={onGoToProfile}>
                        {author.name}
                    </a>
                </div>
                <div className="edit">
                    {author.id === context.userId && (
                        <button onClick={handleEditPost} className="btn-edit">
                            <i className="fa-regular fa-pen-to-square fa-xl"></i>
                        </button>
                    )}
                </div>
            </section>
            <section
                className="post"
                style={{ backgroundImage: `url(${image})` }}
            />
            <section className="btn-group">
                <button
                    type="button"
                    className="btn-love"
                    onClick={handleToggleLikePost}
                >
                    {/* <i className="far fa-heart fa-lg"></i> */}
                    {likes && likes.includes(context.userId) ? (
                        <i className="fa-solid fa-heart fa-xl"></i>
                    ) : (
                        <i className="fa-regular fa-heart fa-xl"></i>
                    )}
                </button>
                {/* <button type="button" className="btn-comment">
                    <i className="far fa-comment fa-lg"></i>
                </button> */}
                {/* <button type="button" className="btn-share">
                    <i className="fas fa-share fa-lg "></i>
                </button> */}
                {author.id === context.userId && (
                    <button onClick={handleDeletePost} className="btn-delete">
                        <i className="fa-solid fa-trash fa-xl"></i>
                    </button>
                )}

                <button
                    type="button"
                    className="btn-bookmark"
                    onClick={handleToggleSavePost}
                >
                    {fav ? (
                        <i className="fa-solid fa-bookmark fa-xl"></i>
                    ) : (
                        <i className="far fa-bookmark fa-xl"></i>
                    )}
                </button>
            </section>
            <section className="caption">
                <p className="like">Likes: {likes && handleShowLikes(likes)}</p>
                <p>
                    <b>
                        <a className="id" href="#" onClick={onGoToProfile}>
                            {`${author.name} `}
                        </a>
                    </b>
                    {textPost}
                </p>
                <p className="time"> {formattedDate}</p>
            </section>
        </div>
    )
}

{
    /* <article style={{ backgroundImage: `url(${image})` }}>
        //     <div className="authorImageTime">
        //         <div className="authorAndAvatar">
        //             {/* <img
        //                 className="avatarUserOnPost"
        //                 src={handleDefaultAvatar()}
        //             /> */
}
//             {/* <p className="nameAuthor"> {nameCreatorPost}</p> */}
//         </div>
//         <div className="imageDate">
//             {/* <img src={image} /> */}
//             <time className="timePost">{formattedDate}</time>
//         </div>
//     </div>

//     <div className="infoPost">
//         <p className="textPost">{textPost}</p>
//     </div>

//     <div className="postButtons">
//
//         <button onClick={handleToggleSavePost}>
//             {favs && favs.includes(id) ? '⭐️' : '☆'}
//         </button>
//         {author.id === context.userId && (
//             <button onClick={handleDeletePost}>🗑️</button>
//         )}
//         <button onClick={handleToggleLikePost}>
//             {likes && likes.includes(context.userId) ? '❤️' : '🤍'}
//         </button>
//         <div className="avatarLikes">
//             {/* {likes && handleAvatarOrLikes()} */}
//             {/* {likes && handleAvatarOrLikes(likes)} */}
//             {/* {likes && likes.length > 4 && (
//                 <p className="likesNumber">+{likes.length}</p>
//             )}{' '} */}
//         </div>
//     </div>
// </article> */}
