import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { API_URLS } from "@/app/utils/constant";

export async function POST(request) {
  const body = await request.json();
  const { action, ...data } = body;

  switch (action) {
    case "login":
      return handleLogin(data);
    case "signup":
      return handleSignup(data);
    case "logout":
      return handleLogout();
    case "refreshToken":
      return handleRefreshToken(data);
    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }
}

async function handleLogin({ email, password, rememberMe }) {
  try {
    const response = await axios.post(
      `${API_URLS.SERVER_URL}/users/tokens/sign_in`,
      { email, password }
    );
    const { token, refresh_token, resource_owner } = response.data;
    const maxAge = rememberMe ? 2592000 : 60 * 60;

    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge,
    });
    cookies().set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge,
    });
    cookies().set("user", JSON.stringify(resource_owner), { maxAge });

    return NextResponse.json({ success: true, user: resource_owner });
  } catch (error) {
    return NextResponse.json(
      { error: error.response?.data || "An error occurred" },
      { status: 400 }
    );
  }
}

async function handleSignup(signUpData) {
  try {
    const response = await axios.post(
      `${API_URLS.SERVER_URL}/users/tokens/sign_up`,
      signUpData
    );
    const { token, refresh_token, resource_owner } = response.data;

    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
    });
    cookies().set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
    });
    cookies().set("user", JSON.stringify(resource_owner), { maxAge: 60 * 60 });

    return NextResponse.json({ success: true, user: resource_owner });
  } catch (error) {
    return NextResponse.json(
      { error: error.response?.data || "An error occurred" },
      { status: 400 }
    );
  }
}

async function handleLogout() {
  try {
    const token = cookies().get("token")?.value;
    if (token) {
      await revokeToken(token);
    }
    cookies().delete("token");
    cookies().delete("refresh_token");
    cookies().delete("user");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error during logout" }, { status: 500 });
  }
}

async function handleRefreshToken({ refreshToken }) {
  try {
    const response = await axios.post(
      `${API_URLS.SERVER_URL}/users/tokens/refresh`,
      null,
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: error.response?.data || "An error occurred" },
      { status: 400 }
    );
  }
}

async function revokeToken(token) {
  try {
    await axios.post(`${API_URLS.SERVER_URL}/users/tokens/revoke`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error revoking token:", error);
  }
}
