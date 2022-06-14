import User from '../models/userModel.js';
import TokenServices from './tokenService.js';
import bcrypt from 'bcryptjs';

class UserServices {
    async registration(username, password) {
        const candidate = await User.findOne({ username })

        if(candidate) throw new Error ('Has this username' )

        const hashPassword = await bcrypt.hashSync(password, 5)
        const user = new User({ username, password: hashPassword })

        const tokens = TokenServices.generateTokens({ id: user.id, username: username })
        await TokenServices.saveToken(user.id, tokens.refresh)

        user.save()
        return { ...tokens, user: { id: user.id, username: username }}
    }

    async login(username, password) {
        const user = await User.findOne({ username })
        if (!user) throw new Error('User not registrated')

        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword) throw new Error('Incorrect password' )

        const tokens = TokenServices.generateTokens({ id: user.id, username: username })
        await TokenServices.saveToken(user.id, tokens.refresh)

        return {...tokens, user: { id: user.id, username: username }}
    }

    async logout(refreshToken) {
        await TokenServices.removeToken(refreshToken)
    }

    async refresh(username, refreshToken) {
        if(!refreshToken) throw new Error('User not authorizate')
        await TokenServices.removeToken(refreshToken)

        const userData = TokenServices.validateRefreshToken(refreshToken)
        const findToken = await TokenServices.findToken(refreshToken)
 
        if(!userData || !findToken) throw new Error('Authorizate error')

        const user = await User.findById(userData.id)
        const tokens = TokenServices.generateTokens({ id: user.id, username: username })
        await TokenServices.saveToken(user.id, tokens.refresh)

        return {...tokens, user: { id: user.id, username: username }}
    }

    async getAllUsers() {
        const users = (await User.find()).map(item => ({ id: item._id, username: item.username}))
        return users
    }
}

export default new UserServices()