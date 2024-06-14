/*
 * @Author: Zhouyang Meng
 * @Date: 2024-06-14 11:52:30
 * @LastEditTime: 2024-06-14 11:53:51
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

  const response = await fetch(
    `${API_URLS.BASIC_URL}users?page_type=${pageType}`
  );
  const data = await response.json();

  return NextResponse.json(data);
}
