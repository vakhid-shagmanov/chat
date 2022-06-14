import tokenServices from '../services/tokenService.js';

export default function(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        if(!authorization) throw new Error()

        const accessToken = authorization.split(' ')[1]
        if(!accessToken) throw new Error()

        const userData = tokenServices.validateAccessToken(accessToken)
        if(!userData) throw new Error()

        req.user = userData
        next()
    } catch (error) {
        res.status(400).json('You not authorizate')
    }
}