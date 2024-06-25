/*
 * @Author: Zhouyang Meng
 * @Date: 2024-06-25 11:35:53
 * @LastEditTime: 2024-06-25 11:53:49
 * @Description:
 *
 * Copyright (c) 2024 by YuyakeSys, All Rights Reserved.
 */
// separate route for projects
import { NextResponse } from "next/server";
import axios from "axios";
import { API_URLS } from "@/app/utils/constant";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const response = await axios.get(`${API_URLS.BASIC_URL}projects/${id}`);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error in project fetch route:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: error.response?.status || 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const response = await axios.delete(
      `${API_URLS.BASIC_URL}projects/${id}`
    );

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    } else {
      return NextResponse.json(
        { message: "Project deleted successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error in project delete route:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: error.response?.status || 500 }
    );
  }
}
