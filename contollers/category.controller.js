import moongose from 'mongoose';
import Category from '../models/category.model';

export const getCategories = (req, res)=> {
    Category.find().exec((err, categories)=>{
        if(err){
            return res.status(400).json({status:400, 'success':false, 'message':'Some error'});
        }
        return res.status(200).json({status:200, 'success':true, 'message':'Category fetched successfully', categories});
    });
}

export const addCategory = (req, res) => {
    const newCategory = new Category(req.body);
    newCategory.save((err, category) => {
        if(err){
            return res.status(400).json({status:400, 'success':false, 'message':'Some error'});
        }
        return res.status(201).json({status:201, 'success':true, 'message':'Book added successfully', category});
    });
}

export const updateCategory = (req, res) => {
    Category.findOneAndUpdate({_id:req.body._id}, req.body, {new:true}, (err, category) => {
        if(err){
            return res.status(400).json({status:400, 'success':false, 'message':'Some error'});
        }
        return res.status(200).json({status:200, 'success':true, 'message':'Book updated successfully', category});
    });
}