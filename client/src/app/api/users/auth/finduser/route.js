// supposed for finding the user login with google
export async function POST(request) {
  try {
    const { email } = await request.json();

    const response = await axios.get(
      `${API_URLS.SERVER_URL}/api/v1/users/find_user`,
      { params: { email } }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error(`Error: ${JSON.stringify(error)}`);
    return NextResponse.json(
      { error: "User lookup failed" },
      { status: error.response?.status || 500 }
    );
  }
}