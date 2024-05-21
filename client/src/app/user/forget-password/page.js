/*
 * @Author: Zhouyang Meng
 * @Date: 2024-05-02 16:24:31
 * @LastEditTime: 2024-05-02 16:28:35
 * @Description: 
 * 
 * Copyright (c) 2024 by YuyakeSys, All Rights Reserved. 
 */
'use client'
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/users/password",
        {
          user: { email },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Failed to send reset password instructions.");
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Send Reset Instructions</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;