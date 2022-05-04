import { Router } from 'express';
import { check } from 'express-validator';
import controller from './authController.js';
import authMiddlewaree from './middlewaree.js';

const router = new Router()

router.post('/registration', [
    check('username', 'Write username').notEmpty(),
    check('password', 'Write username').isLength({ min: 4, max: 16 })
] ,controller.registration)
router.post('/login', controller.login)
router.get('/users', authMiddlewaree, controller.getUsers)

export default router