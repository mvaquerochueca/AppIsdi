console.debug('load validators')

export function validateEmail(email, explain = 'Email') {
    if (typeof email !== 'string') throw new Error(`${explain} is not a string`)
    if (!email.trim().length) throw new Error(`${explain} is empty`)
    // TODO validate email format with regex pattern
}

export function validatePasswordLogin(password, explain = 'Password') {
    if (typeof password !== 'string')
        throw new Error(`${explain} is not a string`)
    if (!password.length) throw new Error(`${explain} is empty`)
}

export function validatePasswordRegister(password, explain = 'Password') {
    if (typeof password !== 'string')
        throw new Error(`${explain} is not a string`)
    if (!password.length) throw new Error(`${explain} is empty`)
    if (!/^[a-zA-Z0-9!@#$%^&*()\-_=+[{\]};:'",<.>/?\\|`~]+$/.test(password))
        throw new Error(`${explain} need a special character`)
    if (!/\d/.test(password)) throw new Error(`${explain} need a number`)
    if (password.trim().length < 8) throw new Error(`${explain} is too short`)
}

export function validateName(name) {
    if (!name.length && !email.length && !password.length)
        throw new Error('All fields are empty')
    if (!name.trim().length) throw new Error('Name is empty')
    if (name.includes(' ')) throw new Error('Name is not valid')
    if (name.trim().length < 2) throw new Error('Name is too short')
    if (typeof name !== 'string') throw new Error(name + ' is not a string')
}

export function validateUrl(url, explain = 'Url') {
    if (typeof url !== 'string') throw new Error(`${explain} is not a string`)
    if (!url.trim().length) throw new Error(`${explain} is empty`)
}

export function validateId(id, explain = 'Id') {
    if (typeof id !== 'string') throw new Error(`${explain} is not a string`)
    if (!id.trim().length) throw new Error(`${explain} is empty`)
}

export function validateText(text, explain = 'Text') {
    if (typeof text !== 'string') throw new Error(`${explain} is not a string`)
    if (!text.trim().length) throw new Error(`${explain} is empty`)
}
export function validateCallback(callback, explain = 'Callback') {
    if (typeof callback !== 'function')
        throw new Error(`${explain} is not a function`)
}
