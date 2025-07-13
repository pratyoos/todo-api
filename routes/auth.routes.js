import express from 'express';

const router = express.Router();

import { registerUser, loginUser } from '../controllers/auth.controller.js';

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/health', (req, res) => {
    res.status(200).json({ message: 'Auth service is healthy' });
});

export default router;