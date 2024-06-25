/*
 * @Author: Zhouyang Meng
 * @Date: 2024-06-25 11:29:09
 * @LastEditTime: 2024-06-25 11:30:57
 * @Description:
 *
 * Copyright (c) 2024 by YuyakeSys, All Rights Reserved.
 */
// app/api/auth/forget-password/route.js

import { NextResponse } from "next/server";
import axios from "axios";
import { API_URLS } from "@/app/utils/constant";
export async function POST(request) {
  try {
    const { email } = await request.json();

    const response = await axios.post(`${API_URLS.SERVER_URL}users/password`, {
      user: { email },
    });

    return NextResponse.json(
      { message: response.data.message },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in forget-password route:", error);
    return NextResponse.json(
      { error: "Failed to send reset password instructions." },
      { status: error.response?.status || 500 }
    );
  }
}
