import express from 'express';
import * as bookController from '../../contollers/book.controller';

const router = express.Router();

router.route('/')
    .get(bookController.getBooks)
    .post(bookController.addBook)
    .put(bookController.updateBook);

router.route('/:id')
    .get(bookController.getBook)
    .delete(bookController.deleteBook);

export default router;