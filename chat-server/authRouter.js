import { Router } from 'express';
import { check } from 'express-validator';
import controller from './controllers/userController.js';
import authMiddleware from './middlewares/authMiddleware.js';

const router = new Router()

router.post('/registration', [
    check('username', 'Write username').notEmpty(),
    check('password', 'Write username').isLength({ min: 4, max: 16 })
], controller.registration)
router.post('/login', controller.login)
router.post('/logout', controller.logout)
router.get('/users', authMiddleware, controller.getUsers)
router.get('/refresh', controller.refresh)

export default router