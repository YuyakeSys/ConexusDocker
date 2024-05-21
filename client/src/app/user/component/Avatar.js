import React, { useState, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { API_URLS } from "@/app/utils/constant";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

export const Avatar = ({ user }) => {
  const [hover, setHover] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleAvatarUpload(user.id, file);
      setOpenModal(false); // Close modal after file selection
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div
      className="text-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="column">
        <div className="col-12">
          <img
            src={
              user.image_url
                ? `${API_URLS.SERVER_URL}${user.image_url}`
                : "https://i.imgur.com/ZqBwLzL.jpeg"
            }
            alt={`${user.full_name}'s Avatar`}
            className="rounded-circle avatar-img"
            style={{
              width: "160px",
              height: "160px",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={handleOpenModal}
          />
        </div>
        <div className="col-12">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => fileInputRef.current.click()}
          >
            <PhotoCamera />
          </IconButton>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileInput}
          />
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#424242",
            boxShadow: 24,
            p: 4,
            borderRadius: 2, // Added border radius for aesthetic purpose
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Profile Photo
          </Typography>
          <Box
            sx={{
              display: "flex", // Added for layout improvement
              flexDirection: "column", // Added for layout improvement
              alignItems: "center", // Added for layout improvement
              justifyContent: "center", // Added for layout improvement
              p: 5, // Added for padding around the content
            }}
          >
            <Box
              component="img"
              sx={{
                height: 200,
                width: 200,
                borderRadius: "95%",
                mb: 2, // Margin bottom for spacing
              }}
              alt="The avatar to edit"
              src={
                user.image_url
                  ? `${API_URLS.SERVER_URL}${user.image_url}`
                  : "https://i.imgur.com/ZqBwLzL.jpeg"
              }
            />
            {/* Replace the button with an icon for a cleaner look */}
            <IconButton aria-label="upload picture" component="label">
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleAvatarUpload}
              />
              <PhotoCamera />
            </IconButton>
          </Box>
          {/* You can add more editing tools here */}
        </Box>
      </Modal>
    </div>
  );
};

const handleAvatarUpload = async (userId, file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  // Implement the logic to upload the file to the server
  try {
    const response = await fetch(
      `${API_URLS.BASIC_URL}/users/${userId}/update_avatar`,
      {
        method: "PUT",
        headers: {
          // 'Authorization': 'Bearer <token>' // If using token-based authentication
        },
        body: formData,
      }
    );

    if (response.ok) {
      // Handle success
      console.log("Avatar uploaded successfully");
    } else {
      // Handle error
      console.error("Failed to upload avatar");
    }
  } catch (error) {
    console.error("Error uploading avatar:", error);
  }
  console.log("File for upload:", file);
};
