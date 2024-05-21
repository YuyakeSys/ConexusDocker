"use client";
import { loginUser } from "../../utils/auth";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/utils/authContext";
import { signIn } from "next-auth/react";
import GLogin from "./g_login";
import { FaFacebookSquare } from "react-icons/fa";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignUp = () => {
    router.push("signup");
  };
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return; // Stop the function if validation fails
    }

    try {
      const response = await loginUser(email, password, rememberMe);
      // Display a success message
      if (response.status == 200) {
        setUser(response.data.resource_owner);
        router.push("/");
      }
      // Handle successful login, e.g., store tokens in local storage
    } catch ({ error, error_description }) {
      if (error_description != null) {
        // If error_description exists in the response, set it as the error message
        setError(error_description[0]);
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="mb-3">Login</h1>
          <div className="card p-4">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
                <Link href="/user/forget-password" passHref>
                  <Button
                    variant="secondary"
                    style={{
                      width: 150,
                      height: 35,
                      textTransform: "none",
                      marginLeft: "auto",
                    }}
                  >
                    Forget Password
                  </Button>
                </Link>
              </div>
              <br />
              <div className="col">
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button
                    className="btn btn-primary me-2"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <button className="btn btn-success" onClick={handleSignUp}>
                    Sign Up
                  </button>
                </div>
                <br />
                <div className="container">
                  <GLogin />
                  <button
                    className="btn btn-light border border-gray-600"
                    onClick={() => signIn("facebook")}
                    style={{ marginTop: "10px" }}
                  >
                    <FaFacebookSquare />
                    <span style={{ marginLeft: "10px" }}>
                      Sign in with Facebook
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
}
