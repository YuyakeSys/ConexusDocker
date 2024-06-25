// app/api/users/password/route.js

import { NextResponse } from "next/server";
import { API_URLS } from "@/app/utils/constant";

export async function PUT(request) {
  const { password, password_confirmation, reset_password_token } =
    await request.json();

  if (password !== password_confirmation) {
    return NextResponse.json(
      { error: "Passwords do not match" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${API_URLS_SERVER_URL}/users/password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          password_confirmation,
          reset_password_token,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(
        { message: "Password reset successful" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: data.error || "Failed to reset password" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
