"use client";
import { addBook, deleteBook, getBooks, updateBook } from "@/actions/book"; // Thêm updateBook vào import
import React, { useEffect, useState } from "react";

export default function BookDialog() {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    price: "",
    position: {
      shelf: "",
      row: "",
      column: "",
    },
  });
  const [listBooks, setListBooks] = useState([]); // Danh sách sách
  const [isOpen, setIsOpen] = useState(false); // Trạng thái mở dialog
  const [editingIndex, setEditingIndex] = useState(null); // Chỉ số sách đang chỉnh sửa

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("position.")) {
      const positionField = name.split(".")[1];
      setFormData({
        ...formData,
        position: {
          ...formData.position,
          [positionField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const fetchData = async () => {
    const books = await getBooks();
    setListBooks(JSON.parse(books));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Nếu đang chỉnh sửa sách
      const bookToUpdate = listBooks[editingIndex];
      const res = await updateBook(bookToUpdate._id, formData); // Gọi hàm cập nhật sách
      if (res) {
        alert("Book updated successfully");
        setEditingIndex(null); // Đặt lại chỉ số chỉnh sửa
      } else {
        alert("Update book failed");
      }
    } else {
      // Nếu đang thêm sách
      const res = await addBook(formData);
      if (res) {
        alert("Add book successfully");
      } else {
        alert("Add book failed");
      }
    }
    fetchData(); // Lấy lại danh sách sách
    setIsOpen(false); // Đóng dialog sau khi gửi
  };

  const handleEdit = (index) => {
    const bookToEdit = listBooks[index];
    setFormData(bookToEdit); // Cập nhật formData với thông tin của sách
    setEditingIndex(index); // Đặt chỉ số sách đang chỉnh sửa
    setIsOpen(true); // Mở dialog
  };

  const handleDelete = async (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      const bookToDelete = listBooks[index];
      const res = await deleteBook(bookToDelete._id); // Giả sử bạn có ID sách
      if (res) {
        alert("Book deleted successfully");
        fetchData(); // Cập nhật danh sách sau khi xóa
      } else {
        alert("Failed to delete book");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(true);
          setEditingIndex(null); // Đặt lại chỉ số khi mở dialog để thêm sách
          setFormData({ name: "", author: "", price: "", position: { shelf: "", row: "", column: "" } }); // Reset formData
        }}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add Book
      </button>
      {listBooks.length > 0 && (
        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Name
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Author
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Price
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Position
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Status
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {listBooks.map((book, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px" }}>{book.name}</td>
                <td style={{ padding: "12px" }}>{book.author}</td>
                <td style={{ padding: "12px" }}>
                  ${book.price.toFixed(2)}
                </td>
                <td style={{ padding: "12px" }}>
                  {book.position.shelf} - {book.position.row} - {book.position.column}
                </td>
                <td style={{ padding: "12px" }}>{book.status}</td>
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => handleEdit(index)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isOpen && (
        <div style={overlayStyle}>
          <div style={dialogStyle}>
            <h2>{editingIndex !== null ? "Edit Book" : "Add Book"}</h2>
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div style={{ flex: "0 0 48%" }}>
                  <label>
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "8px",
                      }}
                    />
                  </label>
                </div>
                <div style={{ flex: "0 0 48%" }}>
                  <label>
                    Author:
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      required
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "8px",
                      }}
                    />
                  </label>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div style={{ flex: "0 0 48%" }}>
                  <label>
                    Price:
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "8px",
                      }}
                    />
                  </label>
                </div>
                <div style={{ flex: "0 0 48%" }}>
                  <label>
                    Shelf:
                    <input
                      type="text"
                      name="position.shelf"
                      value={formData.position.shelf}
                      onChange={handleChange}
                      required
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "8px",
                      }}
                    />
                  </label>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div style={{ flex: "0 0 48%" }}>
                  <label>
                    Row:
                    <input
                      type="text"
                      name="position.row"
                      value={formData.position.row}
                      onChange={handleChange}
                      required
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "8px",
                      }}
                    />
                  </label>
                </div>
                <div style={{ flex: "0 0 48%" }}>
                  <label>
                    Column:
                    <input
                      type="text"
                      name="position.column"
                      value={formData.position.column}
                      onChange={handleChange}
                      required
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "8px",
                      }}
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007BFF",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                {editingIndex !== null ? "Update Book" : "Add Book"}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "gray",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const dialogStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "500px",
};
