// ./src/app/projects/page.jsx
"use client";
import Link from "next/link";
import Select from "react-select";

import { useState, useEffect, useContext } from "react";
import { PROJECT_OPTIONS } from "../utils/constant";
import { useAuth } from "../utils/authRouter";
import { API_URLS } from "../utils/constant";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/fontawesome-free-solid";
import { useRouter } from "next/navigation";
import { Box, TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import styles from "./project.module.css";
import { AuthContext } from "../utils/authContext";

const ProjectsPage = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [recommendProject, setRecommendProject] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const pageSize = 20; // Assuming 20 projects per page (5 columns x 4 rows)
  const { requireAuth } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const router = useRouter();

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    // Perform search logic here with the searchText value
    // Perform search logic here with the searchText value
    console.log("Search text:", searchText);
    // Reset the pagination when performing a new search
    setCurrentPage(1);
    // Fetch data with the updated search query
    fetchData(searchText);
  };

  const MySelect = ({ options }) => {
    const id = Date.now().toString();
    const [isMounted, setIsMounted] = useState(false);

    // Must be deleted once
    // https://github.com/JedWatson/react-select/issues/5459 is fixed.
    useEffect(() => setIsMounted(true), []);

    return isMounted ? (
      <Select
        id={id}
        options={options}
        defaultValue={options[0]}
        onChange={(selectedOption) => setFilter(selectedOption.value)}
      />
    ) : null;
  };

  const handleProjectClick = (e) => {
    e.preventDefault(); // Prevent the default

    requireAuth(() => {
      //new project logic here
      router.push("/projects/new");
      console.log("Creating a new project");
    });
  };

  const fetchData = async (searchQuery = "") => {
    axios
      .get(
        `${API_URLS.BASIC_URL}/projects?page=${currentPage}
    &size=${pageSize}&filter=${filter}&search=${searchQuery}`
      )
      .then((response) => {
        setProjects(response.data.projects);
        setTotalPage(response.data.total_pages);
      })
      .catch((error) => {
        console.log(`Failed to fetch data. Error: ${error}`);
      });
  };

  const fetchRecommendProject = async () => {
    const user_id = user?.id
    axios
      .get(`${API_URLS.BASIC_URL}projects`, {
        params: { user_id: user_id },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Recommended projects loaded successfully!");
          console.log("Recommend projects: ", response.data.recommend_projects);
          const recommendProjects = response.data.recommend_projects
          const allProjectInfo = [];
          recommendProjects.forEach(projectArray => {
            const projectInfo = projectArray[0];
            allProjectInfo.push(projectInfo);
        });
          setRecommendProject(allProjectInfo);
        } else {
          console.log(
            `Recommended projects loading failed. Invalid response status: ${response.status}`
          );
        }
      })
      .catch((error) => {
        console.log(`Project loading failed. Error: ${error.message}`);
      });
  };

  useEffect(() => {
    if (initialLoad) {
      fetchData();
      fetchRecommendProject();
      setInitialLoad(false);
    } else {
      fetchData();
    }
  }, [currentPage, pageSize, filter, initialLoad]);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div
        style={{
          background: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/images/sustainable.jpg')`,
          backgroundSize: "cover",
          // backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          height: "200px",
        }}
        // className="pt-3 container"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ width: { xs: "100%", md: "500px" } }}
        >
          <TextField
            color="success"
            variant="outlined"
            placeholder="Search by name or keyword"
            value={searchText}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1 }}
            size="small"
          />
          <Button
            variant="contained"
            color="success"
            onClick={handleSearch}
            sx={{ ml: 2 }}
          >
            Search
          </Button>
        </Box>
      </div>
      <div className="container">
        <div className="row mb-3">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              gap: 20,
              height: 100,
            }}
          >
            <div className="col-2 mt-2">
              <MySelect options={PROJECT_OPTIONS} />
            </div>
            <div className="col-2 mt-2">
              <Button
                variant="secondary"
                endIcon={<FontAwesomeIcon icon={faPlus} />}
                style={{
                  width: 180,
                  height: 35,
                }}
                onClick={handleProjectClick}
              >
                New project
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        {user && (
          <div className="container mt-10">
            <div className={styles.projectTitle}>
              <h2>Projects for you</h2>
            </div>
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {recommendProject.map((project) => (
                <div className="col" key={project.id}>
                  <Link href={`projects/${project.id}`} passHref>
                    <div
                      className="card h-100"
                      style={{
                        backgroundImage: `url(${
                          project.image_url || "/placeholder-image.jpg"
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{project.title}</h5>
                        <p className="card-text">{project.description}</p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">
                          Last updated:{" "}
                          {project.updated_at?.toString().slice(0, 10)}
                        </small>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ margin: "100px" }}></div>
        <div className="container mt-10">
          <div className={styles.projectTitle}>
            <h2>All projects</h2>
          </div>
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {projects.map((project) => (
              <div className="col" key={project.id}>
                <Link href={`projects/${project.id}`} passHref>
                  <div
                    className="card h-100"
                    style={{
                      backgroundImage: `url(${
                        project.image_url || "/placeholder-image.jpg"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{project.title}</h5>
                      <p className="card-text">{project.description}</p>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">
                        Last updated:{" "}
                        {project.updated_at?.toString().slice(0, 10)}
                      </small>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <br />
        {/* Bootstrap Pagination */}
        <div className="d-flex justify-content-center pe-4">
          <nav>
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <a
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &laquo;
                </a>
              </li>
              {/* Add page numbers dynamically based on the data */}
              {[...Array(totalPage)].map((_, idx) => (
                <li
                  key={idx}
                  className={`page-item ${
                    currentPage === idx + 1 ? "active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    onClick={() => handlePageChange(idx + 1)}
                  >
                    {idx + 1}
                  </a>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPage ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  &raquo;
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default function ClientProjectsPage() {
  return <ProjectsPage />;
}

