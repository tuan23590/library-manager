'use client';
import { getBorrows } from '@/actions/borrow';
import React, { useEffect, useState } from 'react';

export default function Borrow() {
    const [borrow, setBorrow] = useState([]);

    const fetchData = async () => {
        const borrows = await getBorrows();
        setBorrow(JSON.parse(borrows));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={containerStyle}>
            <h2>Danh sách sách đã mượn</h2>
            {borrow.length === 0 ? (
                <p>Không có sách nào được mượn.</p>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Người mượn</th>
                            <th style={thStyle}>Tên sách</th>
                            <th style={thStyle}>Tác giả</th>
                            <th style={thStyle}>Giá</th>
                            <th style={thStyle}>Ngày mượn</th>
                            <th style={thStyle}>Ngày trả</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrow.map((item) => (
                            <tr key={item._id}>
                                <td style={tdStyle}>{item.borrower.name}</td>
                                <td style={tdStyle}>{item.book[0].name}</td>
                                <td style={tdStyle}>{item.book[0].author}</td>
                                <td style={tdStyle}>{item.book[0].price.toLocaleString()} VNĐ</td>
                                <td style={tdStyle}>{new Date(item.borrowDate).toLocaleDateString()}</td>
                                <td style={tdStyle}>{new Date(item.returnDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

// CSS styles
const containerStyle = {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
};

const thStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    backgroundColor: '#4CAF50', // Màu nền của header
    color: '#ffffff', // Màu chữ
    textAlign: 'left',
};

const tdStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    transition: 'background-color 0.2s', // Hiệu ứng chuyển tiếp cho màu nền
};

const trHoverStyle = {
    backgroundColor: '#f1f1f1', // Màu nền khi hover
};

// Thêm hiệu ứng hover cho hàng
const Row = ({ item }) => (
    <tr key={item._id} style={{ ...tdStyle, ':hover': trHoverStyle }}>
        <td>{item.borrower.name}</td>
        <td>{item.book[0].name}</td>
        <td>{item.book[0].author}</td>
        <td>{item.book[0].price.toLocaleString()} VNĐ</td>
        <td>{new Date(item.borrowDate).toLocaleDateString()}</td>
        <td>{new Date(item.returnDate).toLocaleDateString()}</td>
    </tr>
);
