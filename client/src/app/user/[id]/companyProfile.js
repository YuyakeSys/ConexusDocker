import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Avatar } from "../component/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import IndustryBadge from "@/app/utils/IndustryBadge";

import { API_URLS } from "@/app/utils/constant";

const CompanyProfile = ({ user, editClick, current_id }) => {
  // State to manage edit form data
  const [editFormData, setEditFormData] = useState({
    email: user.email,
    full_name: user.full_name,
    image_url: user.image_url,
    mission: user.mission,
    status: user.status,
    team_member: user.team_member?.toString(),
  });
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        if (user && user.team_member) {
          const memberIds = JSON.parse(user.team_member);

          if (memberIds && memberIds.length > 0) {
            const membersData = await Promise.all(
              memberIds.slice(0, 5).map(async (memberId) => {
                const response = await fetch(
                  `${API_URLS.BASIC_URL}/users/${memberId}/get_user_brief`
                );
                if (!response.ok) {
                  throw new Error(
                    `Error fetching member data: ${response.statusText}`
                  );
                }
                return response.json();
              })
            );

            setTeamMembers(membersData);
          } else {
            setTeamMembers([]);
          }
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    if (user && user.team_member) {
      fetchTeamMembers();
    }
  }, [user?.team_member]);

  // Handler to detect changes in form and update state
  const handleChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler to submit changes for a particular field
  const handleSubmit = async (fieldName) => {
    const response = await fetch(
      `http://127.0.0.1:3000/api/v1/users/${user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Include authentication headers if needed
        },
        body: JSON.stringify({
          user: { [fieldName]: editFormData[fieldName] },
        }),
      }
    );

    if (!response.ok) {
      // Handle response errors here
      console.error("Error updating user data");
    }
  };

  return (
    <Container className="my-5 rounded">
      <Row className="mb-3">
        <Col md={8} className="pb-3 rounded">
          <div className="d-flex flex-column align-items-center bg-white shadow">
            <Avatar user={user} className="mb-3 pt-2" />
            <h2>
              {user.full_name || "Consultant Name"}
              {user && String(user.id) === current_id && (
                <IconButton variant="text" onClick={editClick} size="middle">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </IconButton>
              )}
            </h2>
          </div>
          <div className="bg-white shadow ps-4">
            <p className="text-muted">{user?.mission}</p>
          </div>
          <div className="bg-white shadow py-3 rounded mt-3">
            <div className="ms-4">
              <p className="fs-4 fw-bold">Current Projects</p>
            </div>
            <Row xs={1} md={3} className="ms-1 g-2">
              {user.projects.slice(0, 3).map((project) => (
                <Col key={project.id}>
                  <Card className="mb-3 project-card">
                    <Card.Header>
                      <Card.Title>{project.title}</Card.Title>
                    </Card.Header>
                    <Card.Img
                      variant="top"
                      src={project.image_url}
                      className="img-fluid"
                    />
                    <Card.Body>
                      <Card.Text>{project.truncated_description}</Card.Text>
                      {/* <ReadMoreButton onClick={...} /> */}
                    </Card.Body>
                    <Card.Footer>
                      <IndustryBadge industry={project?.industry} />
                      {/* <SkillsBadges skills={project.required_skills} /> */}
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
        <Col md={1}></Col>
        <Col md={3} className="bg-white shadow py-3 rounded">
          <div className="container">
            <h3 className="fw-bold">Related consultants</h3>
            {user.belong_to_avatars.map((user) => (
              <div className="row align-items-center my-2" key={user.id}>
                <div className="col-auto">
                  <img
                    src={`${API_URLS.SERVER_URL}${user.avatar}`}
                    alt={`${user.full_name}'s Avatar`}
                    className="img-fluid rounded-circle" // Bootstrap classes for rounded images
                    style={{
                      width: "56px",
                      height: "56px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col">
                  <span>{user.full_name}</span>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyProfile;
