class Book {
    _id: string;
    title: string;
    author: string;
    publisher: string;
    category: string;
    isbn: string;
    cover: string;
    description: string;
    url: string;
    categoryDetails: any;
    userId: string;

    constructor(){
        this.title = '';
        this.author = '';
        this.publisher = '';
        this.category = '';
        this.isbn = '';
        this.cover = '';
        this.description = '';
        this.url = '';
    }
};

export default Book;