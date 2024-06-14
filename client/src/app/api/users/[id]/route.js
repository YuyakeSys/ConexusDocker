// app/api/users/[id]/route.js
import { NextResponse } from "next/server";
import { API_URLS } from "@/app/utils/constant";


export async function GET(request, { params }) {
  const { id } = params;
  const response = await fetch(`${API_URLS.BASIC_URL}users/${id}`);
  const data = await response.json();

  return NextResponse.json(data);
}
