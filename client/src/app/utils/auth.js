// // utils/auth.js
// import axios from "axios";
// import { getCookie, setCookie, deleteCookie } from "cookies-next";
// import { API_URLS } from "./constant";

// export const loginUser = async (email, password, rememberMe, req, res) => {
//   try {
//     const response = await axios.post(
//       `${API_URLS.BASIC_URL}/users/tokens/sign_in`,
//       {
//         email,
//         password,
//       }
//     );

//     const maxAge = rememberMe ? 2592000 : 60 * 60; // 30 days or 1 hour

//     const { token, refresh_token, resource_owner } = response.data;

//     // Set cookies - both access token and refresh token
//     setCookie("token", token, {
//       req,
//       res,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "development",
//       maxAge: maxAge,
//     });
//     setCookie("refresh_token", refresh_token, {
//       req,
//       res,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "development",
//       maxAge: maxAge,
//     });
//     setCookie("user", JSON.stringify(resource_owner), {
//       req,
//       res,
//       maxAge: maxAge,
//     });

//     return response;
//   } catch (error) {
//     throw error.response?.data || "An error occurred";
//   }
// };

// export const signUpUser = async (
//   email,
//   password,
//   full_name,
//   education,
//   status,
//   mission,
//   team_member,
//   privacy,
//   user_type,
//   belong_to_ids,
//   industry,
//   req,
//   res
// ) => {
//   console.log("sign up start");
//   try {
//     console.log("sign up try");
//     const response = await axios.post(
//       `${API_URLS.SERVER_URL}/users/tokens/sign_up`,
//       {
//         email,
//         password,
//         full_name,
//         education,
//         status,
//         mission,
//         team_member,
//         privacy,
//         user_type,
//         belong_to_ids,
//         industry,
//       }
//     );
//     console.log("sign up response", response);
//     const { token, refresh_token, resource_owner } = response.data;

//     // Set the session cookie on successful sign-up
//     setCookie("token", token, {
//       req,
//       res,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "development",
//       maxAge: 60 * 60,
//     }); // 1 week
//     setCookie("refresh_token", refresh_token, {
//       req,
//       res,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "development",
//       maxAge: 60 * 60,
//     }); // 1 month
//     setCookie("user", JSON.stringify(resource_owner), {
//       req,
//       res,
//       maxAge: 60 * 60,
//     }); // 1 week

//     return resource_owner;
//   } catch (error) {
//     console.log(error);
//     throw error.response?.data || "An error occurred";
//   }
// };

// export const refreshToken = async (refreshToken) => {
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL.SERVER_URL}/users/tokens/refresh`,
//       null,
//       {
//         headers: { Authorization: `Bearer ${refreshToken}` },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     throw error.response?.data || "An error occurred";
//   }
// };

// export const revokeToken = async (accessToken) => {
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/users/tokens/revoke`,
//       null,
//       {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     throw error.response?.data || "An error occurred";
//   }
// };

// export const handleLogout = async (req, res) => {
//   try {
//     // Optionally, revoke the token using an API call if necessary
//     // const token = getCookie('token', { req, res });
//     // await revokeToken(token);
//     if (getCookie("token") != null) {
//       token = getCookie("token");
//       revokeToken(token);
//       deleteCookie("token", { req, res });
//     }
//     // Remove the cookies set during login
//     deleteCookie("refresh_token", { req, res });
//     deleteCookie("user", { req, res });

//     // Redirect or perform other actions as necessary after logout
//   } catch (error) {
//     {
//       console.error("Error during logout", error);
//     }
//   }
// };
// utils/auth.js
import axios from "axios";

export const loginUser = async (email, password, rememberMe) => {
  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", email, password, rememberMe }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "An error occurred during login");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const signUpUser = async (userData) => {
  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "signup", ...userData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "An error occurred during sign up");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "refreshToken", refreshToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || "An error occurred during token refresh"
      );
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const handleLogout = async () => {
  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "An error occurred during logout");
    }

    return await response.json();
  } catch (error) {
    console.error("Error during logout", error);
    throw error;
  }
};

// You can keep this function if you need to make direct API calls
export const revokeToken = async (accessToken) => {
  try {
    const response = await axios.post(
      `${API_URLS.SERVER_URL}/users/tokens/revoke`,
      null,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};
