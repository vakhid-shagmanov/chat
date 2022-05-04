import jwt from 'jsonwebtoken';

export default function(req, res, next) {
    if (req.method === "OPTIONS") next()

    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) return req.status(403).json({ message: 'User not authorizated' })

        const decodeData = jwt.verify(token, 'SECRET_KEY')

        req.user = decodeData
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({ message: 'User not authorizated' })
    }
}