/*
 * @Author: Zhouyang Meng
 * @Date: 2024-05-15 17:18:08
 * @LastEditTime: 2024-05-15 18:54:51
 * @Description:
 *
 * Copyright (c) 2024 by YuyakeSys, All Rights Reserved.
 */
"use client";

import { useState } from "react";
import { loginUser } from "../auth";
import { useRouter } from "next/navigation";
import { API_URLS } from "@/app/components/constant";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { resource_owner } = await loginUser(email, password);
      console.log(resource_owner);
      const isAdmin = await fetch(
        `${API_URLS.BASIC_URL}users/check_admin?user_id=${resource_owner.id}`
      );
      // Check if the user is an admin
      if (isAdmin) {
        // Redirect to the admin dashboard
        router.push("/admin");
      } else {
        // Show an error message for non-admin users
        setError("Please login with an admin account");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
