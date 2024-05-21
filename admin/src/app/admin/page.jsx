/*
 * @Author: Zhouyang Meng
 * @Date: 2024-05-13 22:17:42
 * @LastEditTime: 2024-05-17 15:22:59
 * @Description:
 *
 * Copyright (c) 2024 by YuyakeSys, All Rights Reserved.
 */
// app/admin/page.js
"use client";

import { useContext } from "react";
import { AuthContext, withAuth } from "./authContext";

export default withAuth(function AdminPage() {
  const { user } = useContext(AuthContext);

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
