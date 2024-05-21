"use client";
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const PricingPage = () => {
  const plans = [
    {
      name: "Basic",
      price: 9.99,
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      name: "Pro",
      price: 19.99,
      features: [
        "Feature 1",
        "Feature 2",
        "Feature 3",
        "Feature 4",
        "Feature 5",
      ],
    },
    {
      name: "Enterprise",
      price: 49.99,
      features: [
        "Feature 1",
        "Feature 2",
        "Feature 3",
        "Feature 4",
        "Feature 5",
        "Feature 6",
        "Feature 7",
      ],
    },
  ];

  return (
    <Container className="my-5">
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Pricing
      </Typography>
      <Row className="justify-content-center">
        {plans.map((plan, index) => (
          <Col key={index} xs={12} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{plan.name}</Card.Title>
                <Box mb={2}>
                  <Typography variant="h4" component="div">
                    ${plan.price.toFixed(2)}/month
                  </Typography>
                </Box>
                <List>
                  {plan.features.map((feature, i) => (
                    <ListItem key={i} disableGutters>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
                <Button variant="primary" className="mt-3">
                  Get Started
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PricingPage;
