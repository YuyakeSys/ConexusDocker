"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Button } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./globals.css";

import { SmallAvatar } from "./user/component/SmallAvatar";
import { SENPAGE_DESCRIPTION } from "./utils/textContent";
import { API_URLS } from "@/app/utils/constant";
import Banner from "./components/banner";

import Slider from "react-slick";
// external css for Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const nullOrUndefined = (itemToCheck) =>
  itemToCheck == null || itemToCheck === "undefined";

const Page = () => {
  const [projects, setProjects] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [consultants, setConsultants] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const iconSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };

  const avatarSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    cssEase: "linear",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with the actual URL of your Rails API for the projects endpoint
        // Update the endpoint to accept pagination parameters if necessary
        const [projectsResponse, usersResponse] = await Promise.all([
          fetch(`${API_URLS.BASIC_URL}/projects?filter=main`),
          fetch(`${API_URLS.BASIC_URL}/users?page_type=main`),
        ]);
        console.log("projects", projectsResponse.json);
        console.log("companies", usersResponse.json);
        if (!projectsResponse.ok || !usersResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const projectsData = await projectsResponse.json();
        const usersData = await usersResponse.json();
        setProjects(projectsData.projects);
        setConsultants(usersData.consultants);
        setCompanies(usersData.companies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid>
      <Banner />
      <Container fluid="xxl">
        <Row className="pt-5">
          <Col xs={12} md={8}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3 className="fs-2 pb-3">Check out projects!</h3>
              <a href="/projects">
                <Button
                  variant="text"
                  endIcon={<FontAwesomeIcon icon={faAnglesRight} />}
                >
                  View All Projects
                </Button>
              </a>
            </div>
            <Slider {...settings}>
              {projects.map((project, index) => (
                <div key={index}>
                  <Card style={{ height: "250px" }} className="me-2">
                    <Card.Body>
                      <Card.Title>{project.title}</Card.Title>
                      <Card.Text>{project.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Slider>
          </Col>
          <Col xs={6} md={4}>
            <Card className="d-flex h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-3">
                  About Senpage Consulting
                </Card.Title>
                <Card.Text className="flex-grow-1">
                  {SENPAGE_DESCRIPTION}
                </Card.Text>
                <Card.Text className="text-muted">
                  contact@senpageconsulting.eu
                </Card.Text>
                <Card.Text className="text-muted">CVR: 42883174</Card.Text>
                <Card.Text className="text-muted">
                  Ørestads Boulevard 60, 4th <br />
                  2300 Copenhagen
                </Card.Text>
                <Link href="/contact" passHref>
                  <Button variant="outlined">Contact us</Button>
                </Link>
                {/* Additional content, if any */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="py-3">
          <Col xs={12} md={8}>
            <div className="d-flex justify-content-between align-items-center pb-4">
              <h3 className="fs-2">Companies</h3>
              <a href="/companies">
                <Button
                  variant="text"
                  endIcon={<FontAwesomeIcon icon={faAnglesRight} />}
                >
                  View All Companies
                </Button>
              </a>
            </div>
            <Slider {...iconSettings}>
              {companies.map((company, index) => (
                <div key={index} className="small-avatar">
                  <SmallAvatar user={company}></SmallAvatar>
                </div>
              ))}
            </Slider>
          </Col>
          <Col xs={6} md={4}>
            <Card className="ps-2">
              <Card.Body>
                <Card.Title className="fw-bold pb-2">Contact</Card.Title>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/6387732c01792d359b954e6f/2d187376-e609-4b27-9f8e-0f6a6ff96430/photo.jpeg?format=750w"
                    alt="Sean Vincent"
                    style={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      marginRight: "15px",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h6 style={{ margin: "0" }}>Sean Vincent</h6>
                    <p style={{ margin: "0" }}>
                      Co-Founder & Project Team Director
                    </p>
                    <Button
                      variant="outlined"
                      style={{ marginTop: "10px" }} // Add custom styles or classes for the button
                      endIcon={<FontAwesomeIcon icon={faLinkedin} />}
                    >
                      LinkedIn
                    </Button>
                  </div>
                </div>
                <hr />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="\..\images\marco.png"
                    alt="Marco Constantinou"
                    style={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      marginRight: "15px",
                    }}
                  />
                  <div style={{ flex: 1 }} className="pb-3">
                    <h6 style={{ margin: "0" }}>Marco Constantinou</h6>
                    <p style={{ margin: "0" }}>Project Team Lead</p>
                    <Button
                      variant="outlined"
                      style={{ marginTop: "10px" }} // Add custom styles or classes for the button
                      endIcon={<FontAwesomeIcon icon={faLinkedin} />}
                    >
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs={12} md={8}>
            <h3 className="fs-2 py-4">Browse Our Consultants</h3>
            <Slider {...avatarSettings}>
              {consultants.map((consultant, index) => (
                <div key={index} className="d-inline-block">
                  <a
                    href={`/user/${consultant.id}`}
                    className="text-decoration-none"
                  >
                    <img
                      src={
                        consultant.image_url
                          ? `${API_URLS.SERVER_URL}${consultant.image_url}`
                          : "https://i.imgur.com/ZqBwLzL.jpeg"
                      }
                      className="rounded-circle"
                      alt={consultant.full_name}
                      title={consultant.full_name}
                      style={{ width: "70px", height: "70px" }} // You can adjust the size as needed
                    />
                  </a>
                </div>
              ))}
            </Slider>
          </Col>
          <Col>
            <Card></Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Page;
