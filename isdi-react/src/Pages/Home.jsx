import Posts from '../components/Posts'
import { FiSun, FiMoon, FiMenu } from 'react-icons/fi'
// import SavedPosts from '../components/SavedPosts'
import UpdatePassword from '../components/UpdatePassword'
import UpdateAvatar from '../components/UpdateAvatar'
import { useState, useEffect } from 'react'
import AddPostModal from '../components/AddPostModal'
import EditPostModal from '../components/EditPostModal'
import './Home.css'
import { context, DEFAULT_AVATAR } from '../ui'
import retrieveUser from '../logic/retrieveUser'
import { loadUsers } from '../data'
import Profile from '../components/Profile'
import { Button } from '../library'

export default function Home({ onLoggedOut }) {
    const [view, setView] = useState('posts')
    const [modal, setModal] = useState(false)
    const [postId, setPostId] = useState(null)
    const [lastPostUpdate, setLastPostUpdate] = useState(Date.now())
    const [hideAvatarLink, setHideAvatarLink] = useState(null)
    const [user, setUser] = useState()
    const [isDarkMode, setDarkMode] = useState(false)
    const [open, setOpen] = useState(false)

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

    // useEffect(() => {
    //     const avatarLink = document.getElementById(
    //         'home-header-avatar-img-user'
    //     )
    //     const logoutLink = document.getElementById('home-header-logout')

    //     setHideLogoutLink(logoutLink)

    //     setHideAvatarLink(avatarLink)
    // }, [])

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

    const handleLogout = () => {
        delete context.userId
        onLoggedOut()
    }
    //No se por que funciona asi, pero funciona
    // const handleViewLogout = () => {
    //     if (hideLogoutLink) {
    //     }

    //     if (hideAvatarLink) {
    //     }
    // }

    const handleViewAvatar = () => {
        if (hideAvatarLink) {
        }
    }

    // const handleToggleMenu = () => {
    //     handleViewAvatar()
    //     // handleViewLogout()
    //     setModal(null)
    //     setOpen(!isMenuOpen)
    // }

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
        setOpen(false)

        handleViewAvatar()
    }
    const handleGoToUpdatePassword = (event) => {
        event.preventDefault()
        setModal(null)
        setView('update-password')
        setOpen(false)
        handleViewAvatar()
        // handleViewLogout()
    }

    // const handleGoToSavedPosts = () => {
    //     setModal(null)
    //     setView('saved-posts')
    //     setOpen(false)
    //     handleViewAvatar()
    // }

    const handleGoUpdateAvatar = (event) => {
        event.preventDefault()
        setView('update-avatar')
        setModal(null)
        setOpen(false)
        handleViewAvatar()
    }

    const handleGoToPosts = (event) => {
        event.preventDefault()
        setModal(null)
        setView('posts')
        setOpen(false)
        handleViewAvatar()
    }
    const handlePostUpdated = () => {
        setModal(null)
        setLastPostUpdate(Date.now())
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

    return (
        <>
            <header className="border-b border-gray-300 py-2 block h-14 bg-sky-500 pt-0">
                <div className="flex items-center justify-between xl:max-w-7xl mx-auto    ax-w-full px-[8%] flex-wrap w-full fixed bg-sky-500">
                    <div className="flex items-center justify-start">
                        <FiMenu
                            className="lg:hidden block h-6 w-6 cursor-pointer"
                            onClick={() => setOpen(!open)}
                        />
                    </div>

                    {user && (
                        <div className="flex items-center justify-center flex-grow mt-1 ">
                            <img
                                src={user.avatar}
                                className="w-11 h-11 rounded-full shadow-md"
                                alt="User Avatar"
                                onClick={handleGoToProfile}
                            />
                            <p className="pl-2" onClick={handleGoToProfile}>
                                {user.name}
                            </p>
                        </div>
                    )}

                    <div className="flex items-center justify-end">
                        <button
                            className="bg-blue-500  text-white border-cyan-300 rounded-md mt px-2 text-lg shadow-md"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>

                    <nav
                        className={`${
                            open ? 'block' : 'hidden'
                        }   mb-2 lg:flex lg:items-center lg:w-auto z-10 text-white w-[50%] rounded-lg lg:rounded-none lg:bg-transparent mt-2 lg:mt-0 lg:shadow-none shadow-xl`}
                    >
                        <ul className="w-auto shadow-xl rounded-md shadow-cyan-900">
                            <li>
                                {user && (
                                    <div
                                        id="home-header-avatar-img-user"
                                        className="ml-2   flex items-center"
                                    >
                                        <img
                                            className="w-12 h-12 rounded-full bg-white border-white border-2"
                                            src={user.avatar || DEFAULT_AVATAR}
                                            alt=""
                                        />
                                        <a
                                            href=""
                                            onClick={handleGoToProfile}
                                            className="ml-2 mt-6 left-full top-1/2 transform -translate-y-1/2"
                                        >
                                            {user.name}
                                        </a>
                                    </div>
                                )}
                            </li>
                            <li>
                                <a
                                    onClick={handleGoToPosts}
                                    className="text-white ml-2 lg:px-5 py-2 block hover:text-blue-700 font-semibold"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={handleGoToProfile}
                                    className="text-white ml-2 lg:px-5 py-2 block hover:text-blue-700 font-semibold"
                                >
                                    Profile
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={handleGoToUpdatePassword}
                                    className="text-white ml-2 lg:px-5 py-2 block hover:text-blue-700 font-semibold"
                                >
                                    Update Password
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={handleGoUpdateAvatar}
                                    className="text-white ml-2 lg:px-5 py-2 block hover:text-blue-700 font-semibold"
                                >
                                    Update Avatar
                                </a>
                            </li>

                            <li>
                                <a className="text-white ml-2 lg:px-5 py-2 block hover:text-blue-700 font-semibold">
                                    Saved Post
                                </a>
                            </li>

                            <li>
                                <a
                                    onClick={handleLogout}
                                    className="text-white ml-2 lg:px-5 py-2 block hover:text-blue-700 font-semibold"
                                    id="home-header-logout"
                                >
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="main">
                {view === 'posts' && (
                    <Posts
                        onEditPost={handleOpenEditPostModal}
                        lastPostsUpdate={lastPostUpdate}
                        onGoToProfile={handleGoToUser}
                    />
                )}

                {view === 'profile' && <Profile />}

                {/* {view === 'saved-posts' && <SavedPosts />} */}

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

            <footer className="fixed bottom-0 left-0 right-0 bg-sky-500 text-white flex justify-center items-center h-14">
                <div className="flex ml-auto justify-center items-center h-full">
                    <button
                        className="ml-[100%] text-white bg-blue-700 rounded-md p-2 text-2xl "
                        id="add-post-button"
                        onClick={handleOpenAddPostModal}
                    >
                        +
                    </button>
                </div>
                <div className="ml-auto">
                    <button
                        className="mx-2 text-white bg-blue-700 rounded-md p-2 text-2xl"
                        onClick={handleSwitchMode}
                    >
                        {isDarkMode ? <FiSun /> : <FiMoon />}
                    </button>
                </div>
            </footer>
        </>
    )
}
