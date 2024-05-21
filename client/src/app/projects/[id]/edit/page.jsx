"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from "./editProject.module.css";
import axios from "axios";
import { API_URLS } from "@/app/utils/constant";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "@/app/utils/authContext";
import { INDUSTRY_AREAS } from "@/app/utils/constant";
import SkillsForm from "../../component/skills_form";

export default function EditProject({ params }) {
  const router = useRouter();
  const project_id = params.id;
  const pathname = usePathname();
  const editIndex = pathname.indexOf("/edit");
  const project_path = pathname.slice(1, editIndex);
  const { user } = useContext(AuthContext);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [projectData, setProjectData] = useState({
    title: "",
    resource_links: "",
    industry: "",
    description: "",
    state: "",
    date: "",
    team_members: "",
    user_id: "",
    image_url: "",
  });
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URLS.BASIC_URL}projects/${params.id}`)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setProjectData(data);
          console.log(
            "Project loaded."
          );
        } else {
          console.log(
            `Project loading failed. Invalid response status: ${response.status}`
          );
        }
      })
      .catch((error) => {
        console.log(`Project loading failed. Error: ${error.message}`);
      });
  },[]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user) {
      router.push("/user/login");
    }

    const submitProjectData = {
      project: { ...projectData, "user_id": String(user.id), industry: selectedOption },
    };
    
    console.log(
      `Data is ready to submit: ${JSON.stringify(projectData)}`
    );

    // Update "projects" table.
    axios.patch(`${API_URLS.BASIC_URL}${project_path}`, submitProjectData)
    .then((response) => {
      console.log(
        `Project updated successfully. ${JSON.stringify(response.data)}`
      );
      return axios.post(`${API_URLS.BASIC_URL}saveProjectSkill`, { project_id: project_id, skills: selectedSkills });
    })
    .then(() => {
        console.log('Saved successfully to project_skills!');
    })
    .catch((error) => {
      console.error('Failed to update project or save to project_skills:', error);
    });

    router.push(`https://localhost:8080/${project_path}`);
  };

  const handleCancelClick = () => {
    router.back();
  };

  const getSelectedSkills = (data) => {
    setSelectedSkills(data);
  }
  
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.content}>
        <label htmlFor="title" className={styles.label}>
          Project Title
        </label>
        <input name="title" className={styles.input} onChange={handleChange} />

        <label htmlFor="resource_links" className={styles.label}>
          Resource Links
        </label>
        <input
          name="resource_links"
          className={styles.input}
          onChange={handleChange}
        />

        <label htmlFor="industry" className={styles.label}>
          Industry
        </label>
        <select
          name="industry"
          className={styles.input}
          onChange={(event) => {
            setSelectedOption(event.target.value);
          }}
          value={selectedOption}
        >
          {INDUSTRY_AREAS.map((industry) => {
            return (
              <option key={industry.value} value={industry.value}>
                {industry.label}
              </option>
            );
          })}
        </select>

        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <textarea
          name="description"
          className={styles.textarea}
          onChange={handleChange}
        />

        <label htmlFor="required_skills" className={styles.label}>
          Required Skills
        </label>
        <SkillsForm getSkills={getSelectedSkills}/>
      </div>
      <div className={styles.btn}>
        <button className={styles.confirmBtn} type="submit">
          Confirm
        </button>
        <button className={styles.cancelBtn} onClick={handleCancelClick}>
          Cancel
        </button>
      </div>
    </form>
  );
}
