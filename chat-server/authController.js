import Role from './models/Role.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import jwt  from 'jsonwebtoken';
import { validationResult } from 'express-validator';

function generateAccessToken(id, role) {
    const payload = { id, role }
    return jwt.sign(payload, 'SECRET_KEY', { expiresIn: '24h' })
}

class authController {
    async registration(req, res) {
        try {
            const error = validationResult(req)
            if(!error.isEmpty()) return res.status(400).json({ message: 'Username is empty' })

            const { username, password } = req.body
            const candidate = await User.findOne({ username })

            if(candidate) return res.status(400).json({ message: 'Has this username' })

            const hashPassword = await bcrypt.hashSync(password, 5);
            const userRole = await Role.findOne({ value: 'USER' })
            const user = new User({ username, password: hashPassword, roles: [userRole.value] })
            await user.save()
            return res.json({ message: 'User is created' })
        } catch (error) {
            console.log(error)
            res.status(400).json('registration error')
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ username })

            if (!user) return res.status(400).json({ message: 'User not registrated' })

            const validPassword = bcrypt.compareSync(password, user.password)

            if(!validPassword) return res.status(400).json({ message: 'Incorrect password' })

            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (error) {
            console.log(error)
            res.status(400).json('login error')
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            return res.json(users)
        } catch (error) {
            
        }        
    }
}

export default new authController()