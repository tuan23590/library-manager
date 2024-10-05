"use server";
import Book from "@/models/Book";

export const addBook = async (formData) => {
    const newBook = new Book({
      ...formData,
      status: "available",
    });
    const result = await newBook.save();
    return result ? true : false;
  };

export const getBooks = async () => {
    const books = await Book.find();
    return JSON.stringify(books);
};

export const deleteBook = async (id) => {
    const book = await Book.findByIdAndDelete(id); 
    return book ? true : false;
}

export const updateBook = async (id, formData) => {
    const book = await Book.findByIdAndUpdate (id, formData);
    return book ? true : false;
}

export const getBooksAvailable = async () => {
    const books = await Book.find({status: "available"});
    return JSON.stringify(books);
};
