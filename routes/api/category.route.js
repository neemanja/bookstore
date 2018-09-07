import express from 'express';
import * as categoryController from '../../contollers/category.controller';

const router = express.Router();

router.route('/')
    .get(categoryController.getCategories)
    .put(categoryController.updateCategory)
    .post(categoryController.addCategory);
router.route('/:id')
    .delete(categoryController.deleteCategory)
    .put(categoryController.changeStatus)

export default router;