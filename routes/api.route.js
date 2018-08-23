import express from 'express';
import bookRoutes from './api/book.route';
import categoryRoutes from './api/category.route';
import loginRoutes from './api/login.route';
import registerRoutes from './api/register.route';


const router = express.Router();

router.use('/books', bookRoutes);
router.use('/categories', categoryRoutes);
router.use('/login', loginRoutes);
router.use('/register', registerRoutes);

export default router;
