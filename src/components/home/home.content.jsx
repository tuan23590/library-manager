"use client";
import { getBooksAvailable } from "@/actions/book";
import { addBorrow } from "@/actions/borrow";
import React, { useEffect, useState } from "react";

export default function HomeContent() {
  const [listBooks, setListBooks] = useState([]); // Danh sách sách
  const [user, setUser] = useState(null); // Thông tin người dùng
  const [formData, setFormData] = useState({
    book: [],
    returnDate: "", // Khởi tạo returnDate trong formData
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Trạng thái dialog

  const fetchData = async () => {
    const books = await getBooksAvailable();
    setListBooks(JSON.parse(books));
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    fetchData();
  }, []);

  const handleSelectBook = (book) => {
    if (formData.book.some((selected) => selected._id === book._id)) {
      setFormData((prevState) => ({
        ...prevState,
        book: prevState.book.filter((selected) => selected._id !== book._id),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        book: [...prevState.book, book],
      }));
    }
  };

  const handleBorrowBooks = () => {
    setIsDialogOpen(true); // Mở dialog khi nhấn mượn sách
  };

  const handleSubmit = async () => {
    // kiểm tra ngày trả sách đã được chọn chưa phải là ngày hiện tại+ 1 ngày
    if (new Date(formData.returnDate) <= new Date()) {
      alert("Ngày trả sách phải sau ngày hiện tại.");
      return;
    }

    const res = await addBorrow({
      book: formData.book.map((book) => book._id),
      borrower: user._id,
      borrowDate: new Date().toISOString(),
      returnDate: formData.returnDate,
    });
    if (res) {
      alert("Mượn sách thành công!");
      fetchData();
      setFormData({
        book: [],
        borrower: null,
        borrowDate: null,
        returnDate: "",
      });
      setIsDialogOpen(false); // Cập nhật lại danh sách sách
    } else {
      alert("Mượn sách thất bại!");
    }
  };

  const handleReturnDateChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      returnDate: e.target.value, // Cập nhật returnDate trong formData
    }));
  };

  return (
    <div style={containerStyle}>
      <div style={bookListStyle}>
        {listBooks.length === 0 ? (
          <p>Không có sách nào.</p>
        ) : (
          listBooks.map((book) => (
            <div key={book._id} style={cardStyle}>
              <img
                src="https://static.vecteezy.com/system/resources/previews/009/384/332/large_2x/old-vintage-book-clipart-design-illustration-free-png.png"
                alt={book.name}
                style={imageStyle}
              />
              <h3>{book.name}</h3>
              <p>Tác giả: {book.author}</p>
              <p>Giá: {book.price.toLocaleString()} VNĐ</p>
              <p>
                Vị trí: Kệ {book.position.shelf}, Hàng {book.position.row}, Cột{" "}
                {book.position.column}
              </p>
              <button onClick={() => handleSelectBook(book)}>
                {formData.book.some((selected) => selected._id === book._id)
                  ? "Hủy chọn"
                  : "Chọn vào sách"}
              </button>
            </div>
          ))
        )}
      </div>
      <div style={selectedBooksStyle}>
        <h3>Sách đã chọn:</h3>
        {formData.book.length === 0 ? (
          <p>Chưa có sách nào được chọn.</p>
        ) : (
          <>
            {formData.book.map((book) => (
              <p key={book._id}>{book.name}</p>
            ))}
            <button onClick={handleBorrowBooks} style={borrowButtonStyle}>
              Mượn sách
            </button>
          </>
        )}
      </div>

      {/* Dialog chọn ngày trả sách */}
      {isDialogOpen && (
        <div style={dialogOverlayStyle}>
          <div style={dialogStyle}>
            <h3>Chọn ngày trả sách</h3>
            <input
              type="date"
              value={formData.returnDate} // Sử dụng returnDate trong formData
              onChange={handleReturnDateChange} // Cập nhật hàm xử lý sự kiện
              style={dateInputStyle}
            />
            <div style={dialogButtonContainer}>
              <button onClick={handleSubmit} style={confirmButtonStyle}>
                Xác nhận
              </button>
              <button
                onClick={() => setIsDialogOpen(false)}
                style={cancelButtonStyle}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// CSS styles
const containerStyle = {
  display: "flex",
  gap: "20px",
  padding: "20px",
};

const bookListStyle = {
  flex: 1,
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
};

const selectedBooksStyle = {
  width: "200px",
  padding: "16px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "16px",
  width: "200px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const imageStyle = {
  width: "100%",
  height: "auto",
  borderRadius: "4px",
};

const borrowButtonStyle = {
  marginTop: "10px",
  padding: "8px 16px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const dialogOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const dialogStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
};

const dateInputStyle = {
  margin: "10px 0",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  width: "100%",
};

const dialogButtonContainer = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
};

const confirmButtonStyle = {
  padding: "8px 16px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const cancelButtonStyle = {
  padding: "8px 16px",
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
