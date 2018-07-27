import express from 'express';
import * as userController from '../../contollers/user.controller';

const router = express.Router();

router.route('/')
    .post(userController.login);

export default router;