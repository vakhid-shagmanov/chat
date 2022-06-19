import { validationResult } from 'express-validator';
import UserServices from '../services/userService.js';

class authController {
    async registration(req, res) {
        try {
            const error = validationResult(req)
            if(!error.isEmpty()) return res.status(400).json({ message: 'error' })

            const { username, password } = req.body
            const userData = await UserServices.registration(username, password)

            res.cookie('refresh', userData.refresh, { maxAge: 24 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (error) {
            console.log(error)
            res.status(400).json(error.message)
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const userData = await UserServices.login(username, password);

            res.cookie('refresh', userData.refresh, { maxAge: 24 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (error) {
            console.log(error)
            res.status(400).json(error.message)
        }
    }

    async logout(req, res) {
        try {
            const { refresh } = req.cookies
            await UserServices.logout(refresh)
            res.clearCookie('refresh')
            return res.status(200)
        } catch (error) {
            console.log(error)
            res.status(400).json(error.message)
        }
    }

    async refresh(req, res) {
        try {
            const { refresh } = req.cookies
            const { username } = req.body
            const userData = await UserServices.refresh(username, refresh)
            return res.json(userData)
        } catch (error) {
            console.log(error)
            res.status(400).json(error.message)
        }        
    }

    async getUsers(req, res) {
        try {
            const users = await UserServices.getAllUsers()
            return res.json(users)
        } catch (error) {
            console.log(error)
            res.status(400).json(error.message)
        }        
    }
}

export default new authController()