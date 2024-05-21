/*
 * @Author: Zhouyang Meng
 * @Date: 2024-05-13 22:17:42
 * @LastEditTime: 2024-05-17 15:43:46
 * @Description:
 *
 * Copyright (c) 2024 by YuyakeSys, All Rights Reserved.
 */
// app/admin/page.js
"use client";

import { useContext, useState, useEffect } from "react";
import { AuthContext, withAuth } from "./admin/authContext";
import { API_URLS } from "./components/constant";

export default withAuth(function AdminPage() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/v1/users");
      const data = await response.json();
      setUsers(data.users); // Assuming the backend returns an array of users under the 'users' key
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  if (!user) {
  }

  // Render the admin dashboard or other components
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Add your admin components here */}
    </div>
  );
});
