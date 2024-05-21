/*
 * @Author: Zhouyang Meng
 * @Date: 2024-02-16 03:07:34
 * @LastEditTime: 2024-05-07 12:37:17
 * @Description:
 *
 * Copyright (c) 2024 by YuyakeSys, All Rights Reserved.
 */
// context/AuthContext.js
"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { API_URLS } from "@/app/utils/constant";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchUser = async (id) => {
    try {
      const response = await fetch(`${API_URLS.BASIC_URL}users/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      setUser((prevUser) => ({
        ...prevUser,
        image_url: data.image_url,
      }));
      // Initialize edit form data with user data
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load user from cookie at startup
    const userData = getCookie("user");
    if (userData) {
      setUser(JSON.parse(userData));
      fetchUser(JSON.parse(userData).id);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    // try useMemo to improve the efficiency
    <AuthContext.Provider
      value={useMemo(() => ({ user, setUser, isLoading }), [user, isLoading])}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    // Check if user is not logged in and redirect to login page
    if (!user) {
      router.push("/user/login");
    }

    // Render the component if user is logged in
    return user ? <Component {...props} /> : null;
  };

  return AuthenticatedComponent;
};
