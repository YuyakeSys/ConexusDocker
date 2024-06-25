/*
 * @Author: Zhouyang Meng
 * @Date: 2024-06-14 11:52:30
 * @LastEditTime: 2024-06-25 12:02:38
 * @Description:
 *
 * Copyright (c) 2024 by YuyakeSys, All Rights Reserved.
 */
// app/api/users/route.js
import { NextResponse } from "next/server";
import { API_URLS } from "@/app/utils/constant";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pageType = searchParams.get("page_type");
  const fullName = searchParams.get("full_name");

  let url;
  if (fullName) {
    url = `${API_URLS.BASIC_URL}users/search?full_name=${encodeURIComponent(
      fullName
    )}`;
  } else {
    url = `${API_URLS.BASIC_URL}users?page_type=${pageType}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in user route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const { projects_id, users_id } = await request.json();

  try {
    const response = await fetch(`${API_URLS.BASIC_URL}teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projects_id,
        users_id,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add team member");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in team creation route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
