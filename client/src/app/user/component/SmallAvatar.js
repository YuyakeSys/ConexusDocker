// components/Avatar.js
import React, { useState, useRef } from "react";
import { API_URLS } from "@/app/utils/constant";
import Card from "react-bootstrap/Card";

export const SmallAvatar = ({ user }) => {
  return (
    <Card style={{ width: "13rem" }}>
      <Card.Img
        variant="top"
        style={{ height: 180 }}
        src={
          user.image_url
            ? `${API_URLS.SERVER_URL}${user.image_url}`
            : "https://i.imgur.com/ZqBwLzL.jpeg"
        }
      />
      <Card.Body>
        <Card.Title className="smallCard-title text-center">
          {user.full_name}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};
