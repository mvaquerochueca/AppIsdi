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

    let _user

    try {
        _user = retrieveUser(context.userId)
    } catch (error) {
        alert(error.message)
    }

    const [user, setUser] = useState(_user)

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
    }

    const handleGoToPosts = () => {
        setModal(null)
        setView('posts')
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

    return (
        <div className="home">
            <header className="home-header">
                <button
                    className="button-home button"
                    onClick={handleGoToPosts}
                >
                    Home
                </button>

                <nav className="home-header-nav">
                    <div className=".home-header-avatar-img-user">
                        <img
                            className="home-header-avatar"
                            src={user.avatar}
                            alt=""
                        />
                    </div>
                    <div className="home-link-profile">
                        <a
                            href=""
                            className="link-profile"
                            onClick={handleGoToProfile}
                        >
                            {user.name}
                        </a>
                    </div>
                </nav>
                <div className="btn-container-header-logout">
                    <button
                        onClick={handleLogout}
                        className="btn-home-logout button"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main>
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
