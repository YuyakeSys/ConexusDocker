"use client";
import { useState, useEffect } from "react";
import { API_URLS } from "@/app/utils/constant";
import "../utils/css/CompaniesPage.css";
import Pagination from "react-bootstrap/Pagination";
import Link from "next/link";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URLS.BASIC_URL}/users?page_type=companies&page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setCompanies(data.companies);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error has occurred: {error}</p>;

  return (
    <div>
      {/* Hero section with image and text */}
      <div
        className="hero-section"
        style={{ backgroundImage: `url('/images/nature.jpeg')` }}
      >
        <div className="hero-text">
          <h1>WELCOME TO YOUR STARTUPROOM</h1>
          <p>
            Here, you can accelerate your startup journey from the ideation
            phase to scaling up...
          </p>
          <button className="onboard-button">Onboard your startup</button>
        </div>
      </div>

      {/* Companies section */}
      <div className="companies-section">
        {companies.map((company) => (
          <Link
            key={company.id}
            href={`user/${company.id}`}
            passHref
            legacyBehavior
          >
            <Card component="a" sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 160 }}
                image={
                  company.image_url
                    ? `${API_URLS.SERVER_URL}${company.image_url}`
                    : "https://i.imgur.com/ZqBwLzL.jpeg"
                }
                title={company.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {company.full_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {company?.mission}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center my-4">
        <Pagination>
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </Pagination>
      </div>
    </div>
  );
}

export default CompaniesPage;
