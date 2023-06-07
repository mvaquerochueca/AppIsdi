import Posts from '../components/Posts'
import { FiSun, FiMoon } from 'react-icons/fi'
import SavedPosts from '../components/SavedPosts'
import UpdatePassword from '../components/UpdatePassword'
import UpdateAvatar from '../components/UpdateAvatar'
import { useState, useEffect } from 'react'
import AddPostModal from '../components/AddPostModal'
// import Profile from '../components/Profile'
import EditPostModal from '../components/EditPostModal'
import './Home.css'
import { context, DEFAULT_AVATAR } from '../ui'
import retrieveUser from '../logic/retrieveUser'
import { loadUsers } from '../data'
import Container from '../library/Container'

export default function Home({ onLoggedOut }) {
    const [view, setView] = useState('posts')
    const [modal, setModal] = useState(false)
    const [postId, setPostId] = useState(null)
    const [lastPostUpdate, setLastPostUpdate] = useState(Date.now())
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [hideAvatarLink, setHideAvatarLink] = useState(null)
    const [hideLogoutLink, setHideLogoutLink] = useState(null)
    const [user, setUser] = useState()
    const [isDarkMode, setDarkMode] = useState(false)

    useEffect(() => {
        try {
            retrieveUser(context.userId, (error, user) => {
                if (error) {
                    alert(error.message)
                    return
                }

                setUser(user)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    useEffect(() => {
        const avatarLink = document.getElementById(
            'home-header-avatar-img-user'
        )
        const logoutLink = document.getElementById('home-header-logout')

        setHideLogoutLink(logoutLink)

        setHideAvatarLink(avatarLink)
    }, [])

    useEffect(() => {
        const buttonOpenModal = document.getElementById('add-post-button')

        handleViewButtonOpenModal(buttonOpenModal)
    }, [view])

    const handleViewButtonOpenModal = () => {
        //Comprobar si estoy en la vista de posts para mostrar el boton de añadir post
        if (view === 'posts') {
            document.getElementById('add-post-button').style.display = 'flex'
        } else {
            document.getElementById('add-post-button').style.display = 'none'
        }
    }

    const handleHideProfileHeader = () => {
        if (!isMenuOpen) {
        } else {
        }
    }
    //No se por que funciona asi, pero funciona
    const handleViewLogout = () => {
        if (hideLogoutLink) {
        }

        if (hideAvatarLink) {
        }
    }

    const handleViewAvatar = () => {
        if (hideAvatarLink) {
        }
    }

    const handleToggleMenu = () => {
        handleViewAvatar()
        handleViewLogout()
        setModal(null)
        setMenuOpen(!isMenuOpen)
    }

    const handleSwitchMode = () => {
        setDarkMode(!isDarkMode)
        const htmlElement = document.querySelector('html')
        htmlElement.classList.toggle('dark')
    }

    const handleOpenAddPostModal = () => setModal(!modal ? 'add-post' : null)

    const handleOpenEditPostModal = (postId) => {
        setPostId(postId)
        setModal(!modal ? 'edit-post' : null)
    }
    const handleCloseModal = () => setModal(null)

    const handleGoToUser = (event) => {
        event.preventDefault()
        setView('profile')
    }

    const handleGoToProfile = (event) => {
        event.preventDefault()
        setModal(null)
        setView('profile')
        setMenuOpen(false)

        handleViewAvatar()
        handleViewLogout()
    }
    const handleGoToUpdatePassword = (event) => {
        event.preventDefault()
        setModal(null)
        setView('update-password')
        setMenuOpen(false)
        handleViewAvatar()
        handleViewLogout()
    }

    const handleGoToSavedPosts = () => {
        setModal(null)
        setView('saved-posts')
        setMenuOpen(false)
        handleViewAvatar()
        handleViewLogout()
    }

    const handleGoUpdateAvatar = (event) => {
        event.preventDefault()
        setView('update-avatar')
        setModal(null)
        setMenuOpen(false)

        handleViewAvatar()
        handleViewLogout()
    }

    const handleGoToPosts = (event) => {
        event.preventDefault()

        setModal(null)
        setView('posts')
        setMenuOpen(false)

        handleViewAvatar()
        handleViewLogout()
    }
    const handlePostUpdated = () => {
        setModal(null)
        setLastPostUpdate(Date.now())
    }

    const handleLogout = () => {
        delete context.userId
        onLoggedOut()
    }
    const handleUserAvatarUpdate = () => {
        try {
            retrieveUser(context.userId, (error, user) => {
                if (error) {
                    alert(error.message)
                    return
                }
                setUser(user)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    // const handleDefaultAvatar = () => {
    //     if (!user.avatar) {
    //         return DEFAULT_AVATAR
    //     } else {
    //         return user.avatar
    //     }
    // }

    return (
        <div>
            <header className="home-header">
                <div
                    className={`menu-burger ${isMenuOpen ? 'open' : ''}`}
                    onClick={handleToggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {user && (
                    <div
                        className="home-header-avatar-img-user"
                        id="home-header-avatar-img-user"
                    >
                        <img
                            className="home-header-avatar"
                            src={user.avatar || DEFAULT_AVATAR}
                            alt=""
                        />
                        <a
                            href=""
                            className="link-profile"
                            onClick={handleGoToProfile}
                        >
                            {user.name}
                        </a>
                    </div>
                )}
                <div>
                    <button
                        onClick={handleLogout}
                        // className="button"
                        id="home-header-logout"
                    >
                        <i className="fa-solid fa-arrow-right-from-bracket fa-xl"></i>
                    </button>
                </div>

                <nav className={`home-header-nav ${isMenuOpen ? 'open' : ''}`}>
                    <div
                        className="profile-burger-menu"
                        // onClick={handleHideProfileHeader}
                    >
                        {user && (
                            <div
                                className="home-header-avatar-img-user-burger"
                                id="home-header-avatar-img-user"
                            >
                                <img
                                    className="home-header-avatar"
                                    src={user.avatar || DEFAULT_AVATAR}
                                    alt=""
                                />
                                <a
                                    href=""
                                    className="link-profile"
                                    onClick={handleGoToProfile}
                                >
                                    {user.name}
                                </a>
                            </div>
                        )}
                    </div>
                    {/* <div className="home-link-profile"></div> */}
                    <div>
                        <a
                            className="button-home-burger button"
                            onClick={handleGoToPosts}
                        >
                            Home
                        </a>
                    </div>
                    <div>
                        <a
                            onClick={handleGoToUpdatePassword}
                            className="btn-saved-posts-logout button"
                        >
                            Update Password
                        </a>
                    </div>
                    <div>
                        <a
                            onClick={handleGoUpdateAvatar}
                            className="btn-saved-posts-logout button"
                        >
                            Update Avatar
                        </a>
                    </div>

                    <div>
                        <a
                            onClick={handleGoToSavedPosts}
                            className="btn-saved-posts-logout button"
                        >
                            Favorite Post
                        </a>
                    </div>

                    {/* <div>
                        <a className="btn-home-logout button">Store</a>
                    </div> */}

                    <div className="btn-container-header-logout">
                        <a
                            onClick={handleLogout}
                            className="btn-home-logout-burger button"
                            id="home-header-logout"
                        >
                            Logout
                        </a>
                    </div>
                </nav>
            </header>

            <main className="main">
                {view === 'posts' && (
                    <Posts
                        onEditPost={handleOpenEditPostModal}
                        lastPostsUpdate={lastPostUpdate}
                        onGoToProfile={handleGoToUser}
                    />
                )}

                {view === 'saved-posts' && <SavedPosts />}

                {view === 'update-avatar' && (
                    <UpdateAvatar
                        onUserAvatarUpdated={handleUserAvatarUpdate}
                    />
                )}

                {view === 'update-password' && <UpdatePassword />}

                {modal === 'add-post' && (
                    <AddPostModal
                        onCancel={handleCloseModal}
                        onPostCreated={handlePostUpdated}
                    />
                )}

                {modal === 'edit-post' && (
                    <EditPostModal
                        onCancel={handleCloseModal}
                        onPostUpdated={handlePostUpdated}
                        postId={postId}
                    />
                )}
            </main>

            <footer className="home-footer">
                <div className="btn-post-container-footer">
                    <button
                        className="add-post-button"
                        id="add-post-button"
                        onClick={handleOpenAddPostModal}
                    >
                        +
                    </button>
                </div>
                <div className="toggleDark">
                    <button
                        className="toggleDark-button"
                        onClick={handleSwitchMode}
                    >
                        {isDarkMode ? <FiSun /> : <FiMoon />}
                    </button>
                </div>
            </footer>
        </div>
    )
}
