import createPost from '../logic/createPost'
import { context } from '../ui'
import './Modal.css'

export default function AddPostModal({ onCancel, onPostCreated }) {
    console.log('AddPostModal -> Render')
    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleCreatePost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            createPost(context.userId, image, text)

            onPostCreated()
            alert('Post created successfully')
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <section className="add-post container">
            <form className="modal-add-post" onSubmit={handleCreatePost}>
                <h3>Create Post</h3>
                <input type="url" name="image" id="image" />

                <textarea
                    className="input"
                    name="text"
                    cols="30"
                    rows="10"
                    placeholder="text"
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
                </div>
            </form>
        </section>
    )
}
