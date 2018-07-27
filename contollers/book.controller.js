import mongoose from 'mongoose';
import Book from '../models/book.model';

export const getBooks = (req,res) => {

    Book.aggregate([
        {$lookup:
            {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'categoryDetails'
            }
        }
    ])   
    .exec((err, books) => {
        if(err){
            return res.status(400).json({status:400, 'success':false, 'message':err.message});
        }

        return res.status(200).json({status:200, 'success':true, 'message':'Books fetched successfully', books});
    });
}

export const getBook = (req, res) => {
    Book.find({_id:req.params.id}).exec((err, book)=>{
        if(err){
            return res.status(400).json({status:400, 'success':false, 'message':'Some error'});
        }
        if(book.length){
            return res.status(200).json({status:200, 'success':true, 'message':'Book fetched by id successfully', book});
        }
        else{
            return res.status(400).json({status:400, 'success':false, 'message':'Book with given id not found'});
        }
    });
}

export const addBook = (req, res) => {
    const newBook = new Book(req.body);
    newBook.save((err, book) => {
        if(err){
            return res.status(400).json({status:400, 'success':false, 'message':'Some error'});
        }

        return res.status(201).json({status:201, 'success':true, 'message':'Book added successfully', book})
    });
}

export const updateBook = (req, res) => {
    Book.findOneAndUpdate({_id:req.body.id}, req.body, {new:true}, (err,book) => {
        if(err){
            return res.status(400).json({status:400, 'success':false, 'message':'Some error'});
        }

        console.log(book);
        return res.status(200).json({status:200, 'success':true, 'message':'Book updated successfully', book})
    });
}

export const deleteBook = (req, res) => {
    Book.findByIdAndRemove(req.params.id, (err, book) => {
        if(err){
            return res.status(400).json({status:400, 'success':false, 'message':err.message});
        }

        return res.status(200).json({status:200, 'success':true, 'message':book.title + 'deleted successfuly', book});
    });
}


