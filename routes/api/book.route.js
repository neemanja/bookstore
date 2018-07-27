import express from 'express';
import * as bookController from '../../contollers/book.controller';

import jwt from 'express-jwt';

var auth = jwt({
    secret: 'Bookstote_secret',
    userProperty: 'payload'
});

const router = express.Router();

router.route('/')
    .get(bookController.getBooks)
    .post(auth, bookController.addBook)
    .put(bookController.updateBook);

router.route('/:id')
    .get(bookController.getBook)
    .delete(bookController.deleteBook);

export default router;