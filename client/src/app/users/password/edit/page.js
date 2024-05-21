"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { API_URLS } from "@/app/utils/constant";

const EditPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("reset_password_token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_URLS.SERVER_URL}/users/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          password_confirmation: confirmPassword,
          reset_password_token: resetToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/");
        // Password reset successful
        // Redirect or show a success message
      } else {
        // Password reset failed
        setError(data.error || "Failed to reset password");
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default EditPassword;
