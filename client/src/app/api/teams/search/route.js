// app/api/teams/search/route.js

import { NextResponse } from "next/server";
import axios from "axios";
import { API_URLS } from "@/app/utils/constant";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const projectsId = searchParams.get("projects_id");

  try {
    const response = await axios.get(
      `${API_URLS.BASIC_URL}teams/search`,
      {
        params: { projects_id: projectsId },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error in team search route:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: error.response?.status || 500 }
    );
  }
}
