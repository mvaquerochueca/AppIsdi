import Posts from '../components/Posts'
import { useState } from 'react'
import AddPostModal from '../components/AddPostModal'
import Profile from '../components/Profile'
import EditPostModal from '../components/EditPostModal'
import './Home.css'
import { context } from '../ui'
import retrieveUser from '../logic/retrieveUser'

export default function Home({ onLoggedOut }) {
    const [view, setView] = useState('posts')
    const [modal, setModal] = useState(null)
    const [postId, setPostId] = useState(null)
    const [lastPostUpdate, setLastPostUpdate] = useState(Date.now())
    const [isMenuOpen, setMenuOpen] = useState(false)

    const DEFAULT_AVATAR =
        'https://cdn.leonardo.ai/users/cab13481-4696-43f6-9edf-58576f4a0945/generations/ba9c8e69-01da-43d8-a64b-1a0e2db8598e/Leonardo_Diffusion_Batman_1.jpg'

    let _user

    try {
        _user = retrieveUser(context.userId)
    } catch (error) {
        alert(error.message)
    }

    const [user, setUser] = useState(_user)

    const handleToggleMenu = () => {
        setMenuOpen(!isMenuOpen)
        handleHideProfileHeader()
    }

    const hideAvatar = document.querySelector('.home-header-avatar-img-user')
    const hideProfile = document.querySelector('.link-profile')

    const handleHideProfileHeader = () => {
        hideAvatar.style.display = 'flex'
        hideProfile.style.display = 'flex'
        if (!isMenuOpen) {
            hideAvatar.style.display = 'none'
            hideProfile.style.display = 'none'
        } else {
            hideAvatar.style.display = 'flex'
            hideProfile.style.display = 'flex'
        }
    }

    const handleSwitchMode = () => {
        document.querySelector(':root').classList.toggle('dark')
        if (document.querySelector(':root').classList.contains('dark')) {
            document.querySelector('.btn-home-dark-theme').innerHTML =
                'Light Theme'
        } else {
            document.querySelector('.btn-home-dark-theme').innerHTML =
                'Dark Theme'
        }
    }

    const handleOpenAddPostModal = () => setModal('add-post')

    const handleOpenEditPostModal = (postId) => {
        setPostId(postId)
        setModal('edit-post')
    }
    const handleCloseModal = () => setModal(null)

    const handleGoToProfile = (event) => {
        event.preventDefault()

        setModal(null)
        setView('profile')
        setMenuOpen(false)
    }

    const handleGoToPosts = () => {
        setModal(null)
        setView('posts')
        setMenuOpen(false)
    }
    const handlePostUpdated = () => {
        setModal(null)
        setLastPostUpdate(Date.now())
    }

    const handleLogout = () => {
        delete context.userId
        onLoggedOut()
    }
    const handleUserAvatarUpdated = () => {
        try {
            const user = retrieveUser(context.userId)

            setUser(user)
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDefaultAvatar = () => {
        if (!user.avatar) {
            return DEFAULT_AVATAR
        } else {
            return user.avatar
        }
    }

    return (
        <div className="home">
            <header className="home-header">
                <div
                    className={`menu-burger ${isMenuOpen ? 'open' : ''}`}
                    onClick={handleToggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className="home-header-avatar-img-user">
                    <img
                        className="home-header-avatar"
                        src={handleDefaultAvatar()}
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

                <nav className={`home-header-nav ${isMenuOpen ? 'open' : ''}`}>
                    <div className="">
                        <a
                            href=""
                            className="button-home button"
                            onClick={handleGoToProfile}
                        >
                            <img
                                className="home-header-avatar"
                                src={handleDefaultAvatar()}
                                alt=""
                            />
                            {user.name}
                        </a>
                    </div>
                    {/* <div className="home-link-profile"></div> */}
                    <div>
                        <a
                            className="button-home button"
                            onClick={handleGoToPosts}
                        >
                            Home
                        </a>
                    </div>

                    <div className="btn-container-header-logout">
                        <a
                            onClick={handleLogout}
                            className="btn-home-logout button"
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
                    />
                )}

                {view === 'profile' && (
                    <Profile onUserAvatarUpdated={handleUserAvatarUpdated} />
                )}

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
                        onClick={handleOpenAddPostModal}
                    >
                        +
                    </button>
                    <input
                        className="btn-home-dark-theme"
                        type="checkbox"
                        id="dark-mode"
                        onClick={handleSwitchMode}
                    />
                    <label htmlFor="dark-mode"></label>
                </div>
            </footer>
        </div>
    )
}
