import createPost from '../logic/createPost'
import { context } from '../ui'
import './Modal.css'
import { validateUrl } from '../logic/helpers/validators'
import petitionApiQuote from '../../LibraryApis/petitionApiQuote.js'
import petitionApiImage from '../../LibraryApis/petitionApiImage'
import { useState, useEffect, useRef } from 'react'
import Container from '../library/Container'
import Form from '../library/Form'

export default function AddPostModal({ onCancel, onPostCreated, callback }) {
    console.debug('AddPostModal -> Render')
    const [quote, setQuote] = useState(null)
    const [image, setImage] = useState(null)

    const imageUrlInputRef = useRef(null)

    const handleRandomImage = () => {
        try {
            petitionApiImage((error, message) => {
                if (error) {
                    alert(error.message, 'error')
                    return
                }

                // if (!message) {
                //     return
                // }
                // validateUrl(message, 'Image URL')

                setImage(message)

                imageUrlInputRef.current.value = message
            })
        } catch (error) {
            alert(error.message, 'error')
        }
    }

    // const handleRandomImage = () => {
    //     try {
    //         const imageUrl = petitionApiImage()
    //         validateUrl(imageUrl, 'Image URL')

    //         setImage(imageUrl)
    //         imageUrlInputRef.current.value = imageUrl
    //     } catch (error) {
    //         console.error(error)
    //         // Aquí puedes manejar el error de forma específica, por ejemplo, mostrar un mensaje de error en la interfaz de usuario.
    //     }
    // }

    const handleRandomQuote = () => {
        try {
            petitionApiQuote((error, content) => {
                if (error) {
                    alert(error.message, 'error')
                    return
                }
                setQuote(content)
                document.querySelector('.input-text-add-post').innerHTML =
                    content
            })
        } catch (error) {
            alert(error.message, 'error')
        }
    }

    const handleRandomPost = () => {
        handleRandomImage()
        handleRandomQuote()
    }

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleCreatePost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            createPost(context.userId, image, text, (error) => {
                if (error) {
                    alert(error.message)

                    return
                }
                onPostCreated()
                handleCancel(event)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <Container tag="div" className="add-post">
            <Form
                tag="form"
                className="modal-add-post"
                onSubmit={handleCreatePost}
            >
                <h3>Create Post</h3>
                <input
                    className="input-image-url-add-post"
                    type="url"
                    name="image"
                    id="image"
                    placeholder="Image URL"
                    ref={imageUrlInputRef}
                />

                <textarea
                    className="input-text-add-post"
                    name="text"
                    cols="30"
                    rows="10"
                    placeholder="Text"
                ></textarea>

                <div>
                    <button className="button-create" type="submit">
                        Create
                    </button>
                    <button
                        className="button cancel"
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button onClick={handleRandomPost} type="button">
                        Random Post
                    </button>
                </div>
            </Form>
        </Container>
    )
}
