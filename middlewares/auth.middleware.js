import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token || token === 'null') {
            return res.status(401).json({message: "No authorization"})
        }
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (e) {
        res.status(401).json({message: "No authorization"})
    }
}