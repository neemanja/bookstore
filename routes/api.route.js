import express from 'express';
import bookRoutes from './api/book.route';
import categoryRoutes from './api/category.route';

const router = express.Router();

router.use('/books', bookRoutes);
router.use('/categories', categoryRoutes);

export default router;