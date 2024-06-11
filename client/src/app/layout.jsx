/*
 * @Author: Zhouyang Meng
 * @Date: 2024-05-20 06:38:42
 * @LastEditTime: 2024-06-11 11:31:24
 * @Description:
 *
 * Copyright (c) 2024 by YuyakeSys, All Rights Reserved.
 */
"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import "./globals.css";
import { getCookie } from "cookies-next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./utils/authContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  console.log("Google API Token:", process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Assuming 'user' is the name of the cookie where user data is stored
    const userData = getCookie("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>title</title>
        </Head>
        <html lang="en">
          <body className={`${inter.className}`}>
            <AuthProvider>
              <NavBar />
              <div className="container-fluid" style={{ padding: "0" }}>
                {children}
              </div>
            </AuthProvider>
            <Footer />
          </body>
        </html>
      </GoogleOAuthProvider>
    </>
  );
}
