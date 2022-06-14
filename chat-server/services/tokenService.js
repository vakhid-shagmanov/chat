import jwt  from 'jsonwebtoken';
import userToken from '../models/userToken.js';

class TokenServices {
    generateTokens(payload) {
        const access = jwt.sign(payload, 'SECRET_KEY', { expiresIn: '24h' })
        const refresh = jwt.sign(payload, 'REFRESH_KEY', { expiresIn: '24d' })  
        
        return { access, refresh }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, 'SECRET_KEY')
            return userData
        } catch (error) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, 'REFRESH_KEY')
            return userData
        } catch (error) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await userToken.findOne({user: userId})

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }

        const token = await userToken.create({user: userId, refreshToken})
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await userToken.deleteOne({ refreshToken })
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await userToken.findOne({ refreshToken })
        return tokenData
    }
}

export default new TokenServices();