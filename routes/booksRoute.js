import express from "express";
import {Book} from "../models/bookModel.js";

const router = express.Router();

//vytvoření nove knihy

router.post('/', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author
        };

        const book = await Book.create(newBook);

    }catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
});

//zobrazení všech knih

router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// zobrazení jedné knihy
router.get('/:id', async (request, response) => {
    try {

        const {id} = request.params;

        const book = await Book.findById(id);

        return response.status(200).json({
            count: book.length,
            data: book
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// update book
router.put('/:id', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author',
            });
        }
        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).send({message: 'Book update successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//delete book
router.delete('/:id', async (request, response) => {
    try {
        const {id} = request.params;

        const result = await Book.findByIdAndDelete(id, request.body);

        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).send({message: 'Book deleted successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


export default router;