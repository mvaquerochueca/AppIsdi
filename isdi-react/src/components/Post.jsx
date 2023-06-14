import { context, DEFAULT_AVATAR } from '../ui'
import toggleLikePost from '../logic/toggleLikePost'
import toggleFavPost from '../logic/toggleFavPosts'
import deletePost from '../logic/deletePost'
import { useContext, useState } from 'react'
import Context from '../Context'

export default function Post({
    post: { id, image, text, date, likes, author, fav },
    onEditPost,
    onToggledLikePost,
    onPostDeleted,
    onToggledSavePost,
    onGoToProfile,
}) {
    const { alert, freeze, unfreeze } = useContext(Context)
    const handleEditPost = () => onEditPost(id)

    const handleToggleLikePost = () => {
        try {
            freeze()
            toggleLikePost(context.userId, id, (error) => {
                unfreeze()
                if (error) {
                    alert(error.message)
                }
                onToggledLikePost()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDoubleClick = () => {
        try {
            freeze()
            toggleLikePost(context.userId, id, (error) => {
                unfreeze()
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
                    className="w-8 h-8 rounded-full"
                    src={author.avatar}
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
        <div className="border-4 border-l-emerald-950 rounded-md h-90 w-90">
            <section className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                    <a href="#" className="aling-self-center mt-2 mb-2">
                        {' '}
                        <img
                            className="w-12 h-12 rounded-full"
                            src={author.avatar ? author.avatar : DEFAULT_AVATAR}
                        />
                    </a>
                    <a
                        href=""
                        onClick={onGoToProfile}
                        className="ml-1 text-xl antialiased"
                    >
                        {author.name}
                    </a>
                </div>

                <div className="flex justify-end ">
                    {author.id === context.userId && (
                        <button onClick={handleEditPost} className="mr-2">
                            <i className="fa-regular fa-pen-to-square fa-xl"></i>
                        </button>
                    )}
                </div>
            </section>
            <section className="w-58 h-58">
                <img src={image} onDoubleClick={handleDoubleClick} />
            </section>

            <section className="mt-2 flex justify-between">
                <div>
                    <button
                        type="button"
                        onClick={handleToggleLikePost}
                        className="mr-2 ml-1"
                    >
                        {likes && likes.includes(context.userId) ? (
                            <i
                                className="fa-solid fa-heart fa-xl"
                                style={{ color: 'red' }}
                            ></i>
                        ) : (
                            <i className="fa-regular fa-heart fa-xl"></i>
                        )}
                    </button>

                    {author.id === context.userId && (
                        <button
                            onClick={handleDeletePost}
                            className="btn-delete"
                        >
                            <i className="fa-solid fa-trash fa-xl"></i>
                        </button>
                    )}
                </div>
                <div>
                    <button className="btn-hide-post">
                        <i className="fa-solid fa-eye fa-xl mr-2"></i>
                    </button>

                    <button
                        type="button"
                        className="mr-1"
                        onClick={handleToggleSavePost}
                    >
                        {fav ? (
                            <i
                                className="fa-solid fa-bookmark fa-xl"
                                style={{ color: 'green' }}
                            ></i>
                        ) : (
                            <i className="far fa-bookmark fa-xl"></i>
                        )}
                    </button>
                </div>
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
