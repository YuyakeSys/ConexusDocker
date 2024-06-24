// components/NavBar.js
"use client";

import { React, useEffect, useContext, useMemo } from "react";

import { API_URLS } from "@/app/utils/constant";
import { useRouter } from "next/navigation";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";

import { handleLogout } from "../utils/auth"; // adjust the path as necessary
import { AuthContext } from "../utils/authContext";

export default function NavBar() {
  const router = useRouter();

  const { user, setUser } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(null);

  // avoid re-rendering user avatar
  // const avatarComponent = useMemo(() => {
  //   if (user && user.image_url) {
  //     return (
  //       <Image
  //         src={`${API_URLS.SERVER_URL}${user.image_url}`}
  //         alt="User Profile"
  //         style={{ width: "40px", height: "40px", marginRight: "8px" }}
  //         roundedCircle
  //         className="me-3"
  //       />
  //     );
  //   } else {
  //     return (
  //       <Image
  //         className="border border-gray me-3"
  //         src="https://i.imgur.com/e8buxpa.jpeg"
  //         alt="Default Image"
  //         style={{ width: "40px", height: "40px", marginRight: "8px" }}
  //         roundedCircle
  //       />
  //     );
  //   }
  // }, [user?.image_url]);
  // Updating user avatar
  // useEffect(() => {
  //   const fetchUserAvatar = async () => {
  //     if (user && user.id && !user.image_url) {
  //       try {
  //         const response = await fetch(
  //           `${API_URLS.BASIC_URL}/users/${user.id}/get_avatar`
  //         );
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch user avatar");
  //         }
  //         const data = await response.json();
  //         setUser({ ...user, image_url: data.image_url });
  //       } catch (error) {
  //         console.error("Error fetching user avatar:", error);
  //       }
  //     }
  //   };

  //   fetchUserAvatar();
  // }, [user?.id, setUser]);
  useEffect(() => {
    const fetchUserAvatar = async () => {
      if (user && user.id && !avatarUrl) {
        try {
          const response = await fetch(`/api/avatar/${user.id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch user avatar");
          }
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          setAvatarUrl(objectUrl);
        } catch (error) {
          console.error("Error fetching user avatar:", error);
        }
      }
    };

    fetchUserAvatar();

    // Cleanup function to revoke the object URL
    return () => {
      if (avatarUrl) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [user?.id, avatarUrl]);

  const avatarComponent = useMemo(() => {
    if (avatarUrl) {
      return (
        <Image
          src={avatarUrl}
          alt="User Profile"
          style={{ width: "40px", height: "40px", marginRight: "8px" }}
          roundedCircle
          className="me-3"
        />
      );
    } else {
      return (
        <Image
          className="border border-gray me-3"
          src="https://i.imgur.com/e8buxpa.jpeg"
          alt="Default Image"
          style={{ width: "40px", height: "40px", marginRight: "8px" }}
          roundedCircle
        />
      );
    }
  }, [avatarUrl]);

  const title = (
    <div style={{ display: "flex", alignItems: "center" }}>
      {avatarComponent}
      {user && <p className="fw-bold align-bottom m-0">{user.full_name}</p>}
    </div>
  );

  const handleUserLogout = () => {
    handleLogout();
    setUser(null); // Update state to reflect logged out status
    router.push("/"); // Redirect to the home page
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">
          <Image
            className="ms-3"
            src="https://images.squarespace-cdn.com/content/v1/6387732c01792d359b954e6f/e3933726-5fd7-43bf-9cfe-7b508d128121/Senpage+Consulting.png?format=1500w"
            alt="Senpage Consulting"
            style={{ height: "50px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto fs-5">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            <Nav.Link href="/companies">Companies</Nav.Link>
            <Nav.Link href="/pricing">Pricing</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
          <Nav placement="end" className="me-5">
            {user ? (
              <NavDropdown
                title={title}
                id="dropdown-menu-align-responsive-1s"
                className="me-5"
              >
                <NavDropdown.Item href={`/user/${user.id}`}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleUserLogout}
                  >
                    Logout
                  </button>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/user/login" className="fs-5 me-4">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
