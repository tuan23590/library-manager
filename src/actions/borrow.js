"use server";

import Book from "@/models/Book";
import User from "@/models/User";
import Borrow from "@/models/Borrow";

export const addBorrow = async (formData) => {
    const newBorrow = new Borrow({
      ...formData,
    });
    // update book status
    formData.book.forEach(async (book) => {
      const res = await Book.findByIdAndUpdate(book, { status: "borrowed" });
      console.log(res);
    });
    const result = await newBorrow.save();
    return result ? true : false;
  };

  export const getBorrows = async () => {
    const borrows = await Borrow.find();
    const detailedBorrows = await Promise.all(borrows.map(async (borrow) => {
        // Lấy thông tin người mượn
        const user = await User.findById(borrow.borrower);
        
        // Lấy thông tin sách
        const books = await Promise.all(borrow.book.map(async (bookId) => {
            const book = await Book.findById(bookId);
            return book; // Trả về thông tin sách
        }));

        // Tạo một đối tượng mới với thông tin chi tiết
        return {
            _id: borrow._id,
            borrower: user, // Thông tin người mượn
            book: books, // Thông tin sách
            borrowDate: borrow.borrowDate,
            returnDate: borrow.returnDate,
            __v: borrow.__v
        };
    }));

    return JSON.stringify(detailedBorrows);
};
