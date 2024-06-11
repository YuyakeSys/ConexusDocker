import { NextResponse } from "next/server";

export async function GET(request) {
  const page = request.nextUrl.searchParams.get("page") || 1; // Get page from query params
  const response = await fetch(
    `http://api:3000/api/v1/users?page_type=companies&page=${page}`
  );
  const data = await response.json();
  return NextResponse.json(data);
}
