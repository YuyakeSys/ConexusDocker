"use client";
import { useEffect, useState, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Container, Card, Row, Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { AuthContext } from "@/app/utils/authContext";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ProjectDetailsPage = ({ params }) => {
  const [project, setProject] = useState(null);
  const [requiredSkills, setRequiredSkills] = useState(null);
  const [creator, setCreator] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [consultantName, setConsultantName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  const fetchProject = async (id) => {
    try {
      const response = await fetch(`/api/projects/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }
      const data = await response.json();
      setProject(data.project);
      setRequiredSkills(data.required_skills);
      setCreator(data.full_name);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  // Fetch project details when component mounts
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3000/api/v1/teams/search?projects_id=${params.id}`)
      .then((response) => {
        setTeamMembers(response.data.user_names);
      });

    if (params.id) {
      fetchProject(params.id);
    }
  }, [params.id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const handleClick = (event) => {
    event.preventDefault();

    if (!user) {
      // push to login router on deployed server
      router.push("/user/login");
      return;
    } else {
      switch (event.target.name) {
        case "edit":
          const editPath = `${pathname}/edit`;
          router.push(editPath);
          break;
        case "delete":
          // axios
          //   .delete(`http://127.0.0.1:3000/api/v1${pathname}`)
          //   .then((response) => {
          //     if (response.status === 204) {
          //       console.log("Project delete successfully!");
          //       router.push("/projects");
          //     }
          //   })
          //   .catch((error) => {
          //     console.error("Project delete failed. Error: ", error);
          //   });
          // test if the pathname correct
          fetch(`/api/projects/${id}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (response.status === 204 || response.ok) {
                console.log("Project deleted successfully!");
                router.push("/projects");
              } else {
                throw new Error("Failed to delete project");
              }
            })
            .catch((error) => {
              console.error("Project delete failed. Error: ", error);
            });
          break;
        default:
          break;
      }
    }
  };

  const handleClose = () => {
    setShowAddModal(false);
    fetch(`/api/teams/search?projects_id=${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setTeamMembers(data.user_names);
        console.log(`Response user_names: ${JSON.stringify(data.user_names)}`);
      })
      .catch((error) => console.error("Error:", error));
    router.push(`${params.id}`);
  };

  const handleConfirm = () => {
    fetch(`/api/users?full_name=${encodeURIComponent(consultantName)}`).then(
      (response) => {
        if (response.status === 200) {
          console.log(response.data.user_id);
          console.log(params);
          axios
            .post(`http://127.0.0.1:3000/api/v1/teams`, {
              projects_id: params.id,
              users_id: response.data.user_id,
            })
            .then((response) => {
              alert(`${consultantName} is added to your team!`);
            })
            .catch((error) => {
              console.log(`Team member add failed. Error: ${error}`);
              throw new error();
            });
          console.log("User exits.");
        } else {
          console.log("User does not exist.");
          throw new Error();
        }
      }
    );
  };

  const handleShow = () => {
    setShowAddModal(true);
  };

  return (
    <Container>
      <Row>
        <Col sm={8}>
          <Card style={{ margin: "50px" }}>
            <Card.Header as="h3">{project.title}</Card.Header>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <Card.Title>Industry:</Card.Title>
                <Col md={4} style={{ display: "flex", alignItems: "center" }}>
                  <ListGroup.Item>{project.industry}</ListGroup.Item>
                </Col>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Card.Title>Required Skills:</Card.Title>
                <ListGroup variant="flush">
                  <Row>
                    {requiredSkills.length > 0 ? (
                      requiredSkills.map((skill, index) => (
                        <Col md={2} key={index}>
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
              </ListGroup.Item>
              <Card.Body>
                <Card.Title>Description: </Card.Title>
                <Card.Text>{project.description}</Card.Text>
              </Card.Body>
            </ListGroup>
            <Card.Body>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button variant="success" name="edit" onClick={handleClick}>
                  Edit
                </Button>
                <Button variant="success" name="delete" onClick={handleClick}>
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card style={{ margin: "50px" }}>
            <Card.Header as="h4">Project Team</Card.Header>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <Card.Title>Contact Person: {creator}</Card.Title>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Title>Team members:</Card.Title>
                {teamMembers.map((member, index) => (
                  <Col md={4} key={index}>
                    <ListGroup.Item>{member}</ListGroup.Item>
                  </Col>
                ))}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="success" onClick={handleShow}>
                  Add
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {showAddModal && (
        <>
          <Modal show={showAddModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add team members</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Consultant name:</Form.Label>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Form.Control
                      value={consultantName}
                      onChange={(event) =>
                        setConsultantName(event.target.value)
                      }
                      type="text"
                      placeholder="enter consultant name..."
                      autoFocus
                    />
                    <Button
                      variant="success"
                      value={consultantName}
                      onClick={handleConfirm}
                    >
                      Add
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default ProjectDetailsPage;
