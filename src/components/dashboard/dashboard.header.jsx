'use client';
import { useEffect } from 'react';

export default function DashboardHeader() {

  useEffect(() => {
    // Kiểm tra nếu code đang chạy phía client (localStorage chỉ tồn tại phía client)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      window.location.href = "/login";
    }
  }, []); // Chỉ chạy một lần sau khi component đã mount

  return (
    <></>
  );
}
