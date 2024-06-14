import { NextResponse } from "next/server";
import { API_URLS } from "@/app/utils/constant";

export async function GET(request) {
  const page = request.nextUrl.searchParams.get("page") || 1; // Get page from query params
  const response = await fetch(
    `${API_URLS.BASIC_URL}users?page_type=companies&page=${page}`
  );
  const data = await response.json();
  return NextResponse.json(data);
}
