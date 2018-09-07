import moongose from 'mongoose';
import Category from '../models/category.model';

export const getCategories = (req, res)=> {
    Category.find({status:0}).exec((err, categories)=>{
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
        return res.status(201).json({status:201, 'success':true, 'message':'Category added successfully', category});
    });
}

export const updateCategory = (req, res) => {
    Category.findOneAndUpdate({_id:req.body._id}, req.body, {new:true}, (err, category) => {
        if(err){
            return res.status(400).json({status:400, 'success':false, 'message':'Some error'});
        }
        return res.status(200).json({status:200, 'success':true, 'message':'Category updated successfully', category});
    });
}

export const deleteCategory = (req, res) => {
    Category.findByIdAndRemove(req.params.id, (err, category)=>{
        if(err){
            return res.status(400).json({status:400, 'success':false, 'message':err.message});
        }

        return res.status(200).json({status:200, 'success':true, 'message':category.name + ' deleted successfuly', category});
    })
}

export const changeStatus = (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body, (err, category)=>{
        if(err){
            return res.status(400).json({status:400, 'success':false, 'message':err.message});
        }

        return res.status(200).json({status:200, 'success':true, 'message':category.name + ' deleted successfuly', category});
    })
}