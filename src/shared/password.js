import bcrypt from 'bcryptjs';

export async function encrytPassword(password) {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

export async function decryptPassword(password, pass) {
    return await bcrypt.compare(pass, password)
}