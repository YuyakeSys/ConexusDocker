/*
 * @Author: Zhouyang Meng
 * @Date: 2024-06-14 11:52:30
 * @LastEditTime: 2024-06-25 11:03:49
 * @Description:
 *
 * Copyright (c) 2024 by YuyakeSys, All Rights Reserved.
 */
import { NextResponse } from "next/server";
import { API_URLS } from "@/app/utils/constant";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 10;
  const filter = searchParams.get("filter") || "";
  const search = searchParams.get("search") || "";
  const user_id = searchParams.get("user_id") || "";

  const response = await fetch(
    `${API_URLS.BASIC_URL}/projects?page=${page}&size=${size}&filter=${filter}&search=${search}`
  );

  // If user_id is provided, fetch recommended projects instead
  if (user_id !== null && user_id !== undefined && user_id !== "") {
    url = `${API_URLS.BASIC_URL}/projects?user_id=${user_id}`;
  }

  const data = await response.json();

  return NextResponse.json(data);
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const response = await fetch("/api/projects", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to create project");
    }

    const data = await response.json();
    console.log("Project created successfully:", data);
    // Handle success
  } catch (error) {
    console.error("Error creating project:", error);
    // Handle error
  }
}
