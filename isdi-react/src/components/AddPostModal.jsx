import createPost from '../logic/createPost'
import { context } from '../ui'
import './Modal.css'
import { validateUrl } from '../logic/helpers/validators'
import petitionApiQuote from '../../LibraryApis/petitionApiQuote.js'
import petitionApiImage from '../../LibraryApis/petitionApiImage'
import { useState, useEffect, useRef } from 'react'
import { Input } from '../library'

export default function AddPostModal({ onCancel, onPostCreated, callback }) {
    console.debug('AddPostModal -> Render')
    const [quote, setQuote] = useState(null)
    const [image, setImage] = useState(null)
    // const [selectedImage, setSelectedImage] = useState()

    const imageUrlInputRef = useRef(null)

    const handleRandomImage = () => {
        try {
            petitionApiImage((error, message) => {
                if (error) {
                    alert(error.message, 'error')
                    return
                }

                setImage(message)

                imageUrlInputRef.current.value = message
            })
        } catch (error) {
            alert(error.message, 'error')
        }
    }

    const handleRandomQuote = () => {
        try {
            petitionApiQuote((error, content) => {
                if (error) {
                    alert(error.message, 'error')
                    return
                }
                setQuote(content)
                document.querySelector('.input').innerHTML = content
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

    const handleCreatePost = (event) => {
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
    // function handleCreatePost(event) {
    //     event.preventDefault()

    //     const imageUrl = event.target.image.value
    //     const text = event.target.text.value

    //     if (imageUrl && selectedImage) {
    //         alert('You can only upload one image')
    //         return
    //     }

    //     let image
    //     if (imageUrl && !selectedImage) image = imageUrl
    //     if (selectedImage && !imageUrl) image = selectedImage

    //     try {
    //         createPost(context.userId, image, text, (error) => {
    //             if (error) {
    //                 alert(error.message)

    //                 return
    //             }
    //             onPostCreated()
    //             handleCancel(event)
    //         })
    //     } catch (error) {
    //         alert(error.message)
    //     }
    // }

    return (
        <section className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <form
                className="bg-white rounded-lg p-6"
                onSubmit={handleCreatePost}
            >
                <h3 className="text-xl f text-center mb-4 ">Create Post</h3>
                <input
                    type="url"
                    name="image"
                    id="image"
                    placeholder="Image URL"
                    ref={imageUrlInputRef}
                    className="w-full border-2 border-cyan-500 placeholder-black rounded px-3 py-2 mb-4"
                />

                <textarea
                    className="w-full border-2 border-cyan-500 placeholder-black rounded px-3 py-2 mb-4"
                    name="text"
                    cols="30"
                    rows="10"
                    placeholder="Text"
                ></textarea>

                <div className="flex justify-end">
                    <button
                        className="rounded-lg px-2 text-lg mx-2  mr-2 bg-cyan-500 "
                        type="submit"
                    >
                        Create
                    </button>
                    <button
                        className="rounded-lg px-2 text-lg mx-2  mr-2 bg-cyan-500 "
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    {/* <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleRandomPost}
                        type="button"
                    >
                        Random Post
                    </button> */}
                </div>
            </form>
        </section>

        // <Container tag="div" className="add-post">
        //     <Form onSubmit={handleCreatePost}>
        //         <h3>Create Post</h3>
        //         <input
        //             type="url"
        //             name="image"
        //             id="image"
        //             placeholder="Image URL"
        //         />
        //         {/* <input
        //             name="selectedImage"
        //             type="file"
        //             accept="image/*"
        //             onChange={handleUploadImage}
        //         /> */}

        //         <Input
        //             name="text"
        //             cols="30"
        //             rows="10"
        //             placeholder="Text"
        //         ></Input>

        //         <div>
        //             <Button type="submit">Create</Button>
        //             <Button type="button" onClick={handleCancel}>
        //                 Cancel
        //             </Button>
        //             <Button onClick={handleRandomPost} type="button">
        //                 Random Post
        //             </Button>
        //         </div>
        //     </Form>
        // </Container>
    )
}
