/*
 * @Author: Zhouyang Meng
 * @Date: 2024-02-16 03:07:34
 * @LastEditTime: 2024-04-23 11:08:58
 * @Description:
 *
 * Copyright (c) 2024 by YuyakeSys, All Rights Reserved.
 */
"use client";

import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { Avatar } from "../component/Avatar";
import { faBuildingColumns, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import Link from "next/link";

const EntrepreneurProfile = ({ user, editClick, current_id }) => {
  return (
    <Container className="my-5 rounded">
      <Row className="mb-5">
        <Col md={12} className="bg-dark text-white shadow py-3 rounded">
          {/* User Profile Section */}
          <div className="d-flex flex-column align-items-center">
            <Avatar user={user} className="mb-3" />
            <h2>{user.full_name || "Consultant Name"}</h2>
            <p className="text-muted">{user.user_type}</p>
            {/* Owned Company */}
            {user.owned_company && (
              <div className="mt-3 text-center">
                <p className="fs-5 fw-bold">Owned Company</p>
                <p>{user.owned_company}</p>
              </div>
            )}
            <div className="d-flex justify-content-around w-100 mt-4">
              <div>
                <FontAwesomeIcon icon={faBuildingColumns} className="me-2" />
                <span className="fw-bold">Education:</span> {user.education}
              </div>
              <div>
                <FontAwesomeIcon icon={faBook} className="me-2" />
                <span className="fw-bold">Skills:</span>
                <ul className="list-inline">
                  {user.skills.map((skill, index) => (
                    <li key={index} className="list-inline-item">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="bg-dark text-white shadow py-3 rounded ">
          {/* Projects Section */}
          <p className="fs-4 fw-bold ps-2">Current Projects</p>
          {user.projects.slice(0, 2).map((project) => (
            <Card
              key={project.id}
              className="mb-3 bg-secondary text-white"
              style={{ maxWidth: "370px" }}
            >
              <Row noGutters>
                <Col md={4}>
                  <Link
                    href={`/projects/${project.id}`}
                    key={project.id}
                    passHref
                  >
                    <Card.Img
                      variant="top"
                      src={project.image_url}
                      className="img-fluid"
                    />
                  </Link>
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

export default EntrepreneurProfile;
