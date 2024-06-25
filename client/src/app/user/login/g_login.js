import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/utils/authContext";
import { loginUser, signUpUser } from "@/app/utils/auth";

const API_BASE_URL = "http://127.0.0.1:3000";

const GLogin = () => {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const [rememberMe] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      if (response && response.access_token) {
        try {
          const res = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
            {
              headers: {
                Accept: "application/json",
              },
            }
          );
          const user_info = {
            email: res.data.email,
            password: "123456",
            repeatPassword: "123456",
            fullName: res.data.name,
            education: "",
            companyStatus: "",
            consultantLocation: "",
            entrepreneurMission: "",
            status: "",
            mission: "",
            teamMember: [],
            userType: "consultant",
            belong_to_ids: [],
            industry: [],
            access_token: response.access_token,
            image_url: response.image_url,
          };
          const user_res = await handleLogin(user_info);
          setUser(user_res);
          router.push("/");
        } catch (error) {
          console.log("Error fetching user info:", error);
        }
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleLogin = async ({
    email,
    password,
    fullName,
    education,
    status,
    mission,
    teamMember,
    privacy,
    userType,
    belong_to_ids,
    industry,
    // image_url,
  }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      let loginResponse;
      if (response.status === 200) {
        loginResponse = await loginUser(email, password, rememberMe);
        loginResponse = loginResponse.data.resource_owner;
      } else {
        loginResponse = await signUpUser(
          email,
          password,
          fullName,
          education,
          status,
          mission,
          teamMember,
          privacy,
          userType,
          belong_to_ids,
          industry
        );
      }
      // Avatar.handleAvatarUpload(loginResponse.id, image_url);
      return loginResponse;
    } catch (error) {
      console.log("I am in catch block!");
      console.error(`Error: ${JSON.stringify(error)}`);
      throw error;
    }
  };

  return (
    <div className="shadow-2xl">
      <button
        className="btn btn-light border border-gray-600 gap-10"
        type="button"
        onClick={() => login()}
      >
        <FcGoogle className="mr-4" />
        <span style={{ marginLeft: "10px" }}>Sign in with Google</span>
      </button>
    </div>
  );
};

export default GLogin;
