/*
 * @Author: Zhouyang Meng
 * @Date: 2024-06-24 10:58:18
 * @LastEditTime: 2024-06-24 11:31:17
 * @Description:
 *
 * Copyright (c) 2024 by YuyakeSys, All Rights Reserved.
 */
import { NextResponse } from "next/server";
import { API_URLS } from "@/app/utils/constant";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const response = await fetch(
      `${API_URLS.BASIC_URL}/users/${id}/get_avatar`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user avatar from external API");
    }

    const imageUrl = `${API_URL}${data.image_url}`;

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error("Failed to fetch image");
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get("content-type");

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching avatar:", error);
    return NextResponse.json(
      { error: "Failed to fetch avatar" },
      { status: 500 }
    );
  }
}
