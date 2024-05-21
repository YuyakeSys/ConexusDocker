/*
 * @Author: Zhouyang Meng
 * @Date: 2024-02-16 03:07:34
 * @LastEditTime: 2024-04-26 15:07:41
 * @Description:
 *
 * Copyright (c) 2024 by YuyakeSys, All Rights Reserved.
 */
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { Avatar } from "../component/Avatar";
import { faBuildingColumns, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { faIndustry } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@mui/material";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const ConsultantProfile = ({ user, editClick, current_id }) => {
  const handleEditProfileClick = () => {
    // router.push(`/user/${user.id}/edit_profile_form`);
  };

  return (
    <Container className="my-5 rounded">
      <Row className="mb-3">
        <Col md={5} className="pb-3 rounded">
          <div className="d-flex flex-column align-items-center bg-white shadow">
            <Avatar user={user} className="mb-3 pt-2" />
            <h2>{user.full_name || "Consultant Name"}</h2>
            <p className="text-muted">
              {user.user_type} | {user.status}
            </p>
            <p className="text-muted">{user.mission}</p>
            <p>
              {user?.country},{user?.city}
            </p>
            {user && String(user.id) === current_id && (
              <IconButton variant="text" onClick={editClick} size="middle">
                <FontAwesomeIcon icon={faPenToSquare} />
              </IconButton>
            )}
          </div>
          <div md={5} className="bg-white shadow py-3 rounded mt-3">
            <div className="ms-4">
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faBuildingColumns} className="mb-3" />
                <p className="fs-4 fw-bold ms-2">Education</p>
              </div>
              <p className="fs-5 ms-2">{user.education}</p>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faBook} className="mb-3" />
                <p className="fs-4 fw-bold ms-2">Skills</p>
                <Button variant="text" className="mb-3 ms-4">
                  Add skills
                </Button>
              </div>
              {/* <ListGroup>
                  {user.skills && user.skills.length > 0 ? (
                    user.skills.map((skill, index) => (
                      <ListGroup.Item key={index}>{skill}</ListGroup.Item>
                    ))
                  ) : (
                    <p>No skills listed.</p>
                  )}
                </ListGroup> */}
              <ListGroup variant="flush">
                <Row>
                  {user.skills.slice(0, 9).length > 0 ? (
                    user.skills.slice(0, 9).map((skill, index) => (
                      <Col md={4} key={index}>
                        <ListGroup.Item>{skill}</ListGroup.Item>
                      </Col>
                    ))
                  ) : (
                    <Col>
                      <p>No skills listed.</p>
                    </Col>
                  )}
                </Row>
              </ListGroup>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faIndustry} className="mb-3" />
                <p className="fs-4 fw-bold ms-2">Interested fields:</p>
              </div>
              <ListGroup>
                {JSON.parse(user.industry) && user.industry.length > 0 ? (
                  JSON.parse(user.industry).map((single_industry, index) => (
                    <ListGroup.Item key={index}>
                      {single_industry}
                    </ListGroup.Item>
                  ))
                ) : (
                  <p>No skills listed.</p>
                )}
              </ListGroup>
            </div>
          </div>
        </Col>
        <Col md={1} className="py-3"></Col> {/* Small blank space */}
        <Col md={6} className="bg-white shadow py-3 rounded">
          <div className="ms-4">
            <p className="fs-4 fw-bold">Current Projects</p>
          </div>
          {user.projects.slice(0, 3).map((project) => (
            <Card key={project.id} className="mb-3">
              <Row>
                <Col md={4}>
                  <Card.Img
                    variant="top"
                    src={project.image_url}
                    className="img-fluid"
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                    <Card.Text>{project.truncated_description}</Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ConsultantProfile;
