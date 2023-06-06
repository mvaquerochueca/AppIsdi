export default function petitionApiImage(callback) {
    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
        const { message } = JSON.parse(xhr.responseText)
        callback(null, message)
    }

    xhr.onerror = () => {
        callback(new Error('Connection error'))
    }

    xhr.open('GET', 'https://dog.ceo/api/breeds/image/random')
    xhr.send()
}
